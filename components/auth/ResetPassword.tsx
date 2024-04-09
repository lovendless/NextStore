'use client'

import { useRef, useState, useEffect, FormEventHandler } from 'react';
import axios from '@/config/axios';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;
const RESET_URL = '/api/newpwd';

function ResetPassword() {
   
   const errRef = useRef<HTMLInputElement>(null!);

   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   const [pwd, setPwd] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd,] = useState('');
   const [validMatchPwd, setValidMatchPwd] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   const [errMsg, setErrMsg] = useState('');

   useEffect(() => {

      const result = PWD_REGEX.test(pwd);
      setValidPwd(result);

      const match = pwd === matchPwd;
      setValidMatchPwd(match);
   }, [pwd, matchPwd])

   useEffect(() => {
      setErrMsg('');
   }, [pwd, matchPwd])


   //=========handleSubmit======== //

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      setIsLoading(true)

      const v = PWD_REGEX.test(pwd);

      if (!v) {
         setErrMsg("Incorrect Password")
         return
      }

      try {
         //?baseURL: "http://localhost:3000"
         await axios.post(RESET_URL,
            //? Если в API user и pwd обозначаются по другому, то нужно указать {key: value,}
            JSON.stringify({ newPwd: pwd, token }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            }
         );

         setPwd('')
         setMatchPwd('')
         setSuccess(true)
      }
      catch (err: any) {
         if (err?.response?.status === 400) {
            setErrMsg('Password change request is not valid');
         } else {
            setErrMsg('No Server Response');
         }
         errRef.current.focus();
      }
      finally {

         setIsLoading(false)

      }
   }

   return (
      /*=========FORM========== */

      <section className='flex forgot-password'>

         {!token ?
            <h1>Error</h1> :
            isLoading ?
               <div className="loader"></div> :
               success ?
                  <div>
                     <p>
                        Your password has been changed succesfully.
                        <Link className="sign-in" href="/sign-in">Sign in</Link>
                     </p>
                  </div> :
                  <div className='flex forgot-password__form'>

                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                     </p>

                     <h1>Enter your new password</h1>

                     <form onSubmit={handleSubmit}>


                        <label htmlFor="password">
                           Password:
                           <span className={validPwd ? 'valid' : 'hide'}>
                              <FontAwesomeIcon icon={faCheck} />
                           </span>
                           <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                              <FontAwesomeIcon icon={faTimes} />
                           </span>
                        </label>
                        <input
                           id="password"
                           type="password"
                           onChange={(e) => setPwd(e.target.value)}
                           required
                           aria-invalid={validPwd ? 'false' : 'true'}
                           aria-describedby='pwdnote'
                           onFocus={() => setPwdFocus(true)}
                           onBlur={() => setPwdFocus(false)}
                        />
                        <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                           <FontAwesomeIcon icon={faInfoCircle} />
                           8 to 24 characters. <br />
                           Must include uppercase and lowercase letters, a number and a special character. <br />
                           Allowed special characters: <span aria-label="dot">.</span><span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span>
                           <span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>

                        {/*=======Confirm Password=======*/}

                        <label htmlFor="confirm_pwd">
                           Confirm Password:
                           <span className={validMatchPwd && matchPwd ? 'valid' : 'hide'}>
                              <FontAwesomeIcon icon={faCheck} />
                           </span>
                           <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
                              <FontAwesomeIcon icon={faTimes} />
                           </span>
                        </label>
                        <input
                           id="confirm_pwd"
                           type="password"
                           onChange={(e) => setMatchPwd(e.target.value)}
                           required
                           aria-invalid={validMatchPwd ? 'false' : 'true'}
                           aria-describedby='confirmnote'
                           onFocus={() => setMatchFocus(true)}
                           onBlur={() => setMatchFocus(false)}
                        />
                        <p id='confirmnote' className={matchFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                           <FontAwesomeIcon icon={faInfoCircle} />
                           Must match the first password input field.
                        </p>

                        {/*=======Button=======*/}

                        <button className='btn' disabled={isLoading}>
                           <span>Change Password</span>
                        </button>

                     </form>
                  </div>
         }

      </section>

   )

}

export default ResetPassword


