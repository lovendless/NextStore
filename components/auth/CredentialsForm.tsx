'use client'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuthForm } from '@/hooks/useAuthForm';


function CredentialsForm() {

   const router = useRouter();

   const { isLoading, startLoading, endLoading, setErrMsg } = useAuthForm();

   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || '/';

   const userRef = useRef<HTMLInputElement>(null!);

   const [user, setUser] = useState('');

   const [pwd, setPwd] = useState('');

   useEffect(() => {
      userRef.current.focus();
   }, []);

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      startLoading();

      const formData = new FormData(e.currentTarget);

      const res = await signIn("credentials", {
         username: formData.get("username"),
         password: formData.get("password"),
         redirect: false,
      });

      if (res && !res.error) {
         setErrMsg('');
         window.location.assign(callbackUrl);
      } else {

         if (res?.error === 'User is not active') {
            // the person has not confirmed his account by email
            router.push('/denied');
         } else if (res?.status === 400) {
            setErrMsg('Missing Username and Password');
         } else if (res?.status === 401) {
            setErrMsg('Wrong Username or Password');
         } else {
            setErrMsg('Login Failed');
         }
      }

      endLoading();

   }

   return (
      <>
         <section className="auth">

            <div className='form'>

               <form onSubmit={handleSubmit}>

                  {/*=======Username=======*/}
                  <div className='input flex direction-col'>
                     <label htmlFor="username">
                        Username:
                     </label>
                     <input
                        id="username"
                        name="username"
                        type="text"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                     />
                  </div>

                  {/*=======Password=======*/}
                  <div className='input flex direction-col'>
                     <label htmlFor="password">
                        Password:
                     </label>
                     <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        autoComplete='on'
                     />
                     <Link href="/forgotpwd">Forgot Password?</Link>
                  </div>
                  {/*=======Button=======*/}

                  <button className='btn' disabled={isLoading}>
                     <span>Sign In</span>
                  </button>

               </form>
            </div>


         </section>
      </>
   )
}


export { CredentialsForm }
