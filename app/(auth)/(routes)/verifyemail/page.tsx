'use client'

import axios from "@/config/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react"

function TokenFallback() {
   return <h2>token placeholder</h2>
}

export default function VerifyEmailPage() {

   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   const [verified, setVerified] = useState(false);
   const [error, setError] = useState(false);
   const [errMsg, setErrMsg] = useState('');

   const verifyUserEmail = useCallback(async () => {
      try {
         await axios.post('/api/verifyemail', { token });
         setVerified(true);
      } catch (err: any) {
         setError(true);
         if (err?.response.status === 400) {
            setErrMsg("Invalid Token")
         } else {
            setErrMsg("No Server Response")
         }
      }

   }, [token]);

   useEffect(() => {
      if (token !== null) {
         verifyUserEmail()
      }
      // eslint-disable-next-line
   }, [token, verifyUserEmail])

   return (
      <section className="verifyemail">
         <div className="verifyemail__inner flex ">
            <h1>Verify Email</h1>

            <Suspense fallback={<TokenFallback />}>
               <h2>{token ? `${token}` : "no token"}</h2>
            </Suspense>

            {verified && (
               <div className="verifyemail__verified flex">
                  <h2>Email Verified</h2>
                  <Link className="sign-in" href="/sign-in">Sign in</Link>
               </div>
            )}
            {error && (
               <div>
                  <h2 style={{ 'color': 'red' }}>{`Error: ${errMsg}`}</h2>
               </div>
            )}
         </div>
      </section>
   )
}
