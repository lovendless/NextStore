'use client'
import Link from 'next/link'
import { CredentialsForm } from './CredentialsForm'
import GoogleButton from '../UI/buttons/GoogleButton'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useEffect, useRef } from 'react'


export default function Login() {

   const isLoading = useAuthForm((state) => state.isLoading);
   const errMsg = useAuthForm((state) => state.errMsg)

   const errRef = useRef<HTMLDivElement>(null!);

   useEffect(() => {
      if (errMsg) {
         errRef.current.focus()
      }
   }, [errMsg])

   return (
      <section className='flex login'>
         {isLoading ?
            <div className="loader"></div>
            :
            <>
               <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                  {errMsg}
               </p>
               <GoogleButton />
               <span className="or">or</span>
               <CredentialsForm />
               <Link href="/sign-up">Create Account</Link>
            </>
         }
      </section>
   )
}
