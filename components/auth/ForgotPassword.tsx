'use client'
import { useRef, useState, useEffect, FormEventHandler } from 'react';

import axios from '@/config/axios';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const RESET_URL = '/api/email';

function ForgotPassword() {
   const mailRef = useRef<HTMLInputElement>(null!);
   const errRef = useRef<HTMLInputElement>(null!);

   const [email, setEmail] = useState<String>('');

   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState<Boolean>(false);

   const [errMsg, setErrMsg] = useState<String>('');

   useEffect(() => {
      mailRef.current.focus();
   }, [])

   useEffect(() => {
      setErrMsg('')
   }, [email])

   //=========handleSubmit======== //

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      setIsLoading(true)

      try {
         //?baseURL: "http://localhost:3000"
         await axios.post(RESET_URL,
            //? Если в API user и pwd обозначаются по другому, то нужно указать {key: value,}
            JSON.stringify({ email }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            }
         );

         setEmail('')
         setSuccess(true)
      }
      catch (err: any) {
         if (err?.response?.status === 401) {
            setErrMsg('User with this email dont exists');
         } else {
            setErrMsg('No Server Response');
         }
         errRef.current.focus();
      }
      finally {
         setIsLoading(false)
      }
   }

   //===============//

   return (
      /*=========FORM========== */

      <section className='flex forgot-password'>

         {
            isLoading ?
               <div className="loader"></div> :
               success ?
                  <div>
                     <p>
                        We have sent you a link to reset your password.
                     </p>
                  </div> :
                  <div className='flex forgot-password__form'>
                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                     </p>

                     <h1>Enter your email</h1>
                     <p>Please enter your email address we&apos;ll send you a link to reset your password.</p>

                     <form onSubmit={handleSubmit}>

                        <input
                           ref={mailRef}
                           id="email"
                           type="text"
                           onChange={(e) => setEmail(e.target.value)}
                           autoComplete="on"
                           required
                           placeholder='example@mail.com'
                        />

                        {/*=======Button=======*/}

                        <button className='btn' disabled={isLoading}>
                           <span>Reset your password</span>
                        </button>

                     </form>
                  </div>
         }


      </section>

   )

}

export default ForgotPassword

