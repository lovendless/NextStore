'use client'
import { useRef, useState, useEffect, FormEventHandler } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '@/config/axios';
import Link from 'next/link';
import { Err } from '../UI/messages/Err';
import Label from '../UI/label/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/register';

function RegisterForm() {
   //const router = useRouter();

   const userRef = useRef<HTMLInputElement>(null!);
   const errRef = useRef<HTMLDivElement>(null!);

   const [user, setUser] = useState('');
   const [validUser, setValidUser] = useState(false);
   const [errUserMsg, setErrUserMsg] = useState('');
   const [userFocus, setUserFocus] = useState(false);

   const [email, setEmail] = useState('');
   const [validEmail, setValidEmail] = useState(false);
   const [errEmailMsg, setErrEmailMsg] = useState('');
   const [emailFocus, setEmailFocus] = useState(false);

   const [pwd, setPwd] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [errPwdMsg, setErrPwdMsg] = useState('');
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd,] = useState('');
   const [validMatchPwd, setValidMatchPwd] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errMsg, setErrMsg] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const [success, setSuccess] = useState(false);

   const [msg, setMsg] = useState('');

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      if (user) setErrUserMsg('');
      const result = USER_REGEX.test(user);

      setValidUser(result);
   }, [user])

   useEffect(() => {

      if (email) setErrEmailMsg('');

      const result = EMAIL_REGEX.test(email);

      setValidEmail(result);
   }, [email])

   useEffect(() => {
      if (pwd || matchPwd) setErrPwdMsg('');
      const result = PWD_REGEX.test(pwd);

      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatchPwd(match);
   }, [pwd, matchPwd])

   useEffect(() => {
      setMsg('');
      setErrMsg('');
   }, [user, pwd, email, matchPwd])

   //=========handleSubmit======== //

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      const v3 = EMAIL_REGEX.test(email);

      !v1 ? setErrUserMsg("Incorrect Username") : setErrUserMsg("")
      !v2 ? setErrPwdMsg("Incorrect Password") : setErrPwdMsg("")
      !v3 ? setErrEmailMsg("Incorrect Email") : setErrEmailMsg("")

      if (!v1 || !v2 || !v3) {
         setErrMsg('Invalid Entry');
         return;
      }

      try {
         setIsLoading(true)
         //?baseURL: "http://localhost:3000"
         const res = await axios.post(REGISTER_URL,
            //? Если в API user и pwd обозначаются по другому, то нужно указать {key: value,}
            JSON.stringify({ username: user, email, password: pwd }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            }
         );

         setMsg(res.data.message)
         setSuccess(true)
         //router.push('/sign-in');
      }
      catch (err: any) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } else if (err?.response?.status === 409) {
            setErrMsg(err?.response?.data?.message);
         } else {
            setErrMsg('Registration Failed')
         }
         //errRef.current.focus();
      } finally {
         setIsLoading(false)
      }
   }

   //===============//

   return (
      /*=========FORM========== */

      <section className='register'>

         {
            isLoading ?
               <div className='loader'></div> :
               success ?
                  <div className='flex direction-col al-items-center'>
                     <h1>{msg}</h1>
                     <Link className="sign-in" href="/sign-in">Sign in</Link>
                  </div> :
                  <div className='form'>
                     <Err message={errMsg} />

                     <h1>Sign Up</h1>

                     <form onSubmit={handleSubmit}>

                        {/*=======Username=======*/}
                        <div className='input flex direction-col'>
                           <Err message={errUserMsg} />
                           <Label htmlFor={"username"} label={"Username"} value={user} validValue={validUser}/>
                           <input
                              id="username"
                              type="text"
                              ref={userRef}
                              autoComplete='off'
                              onChange={(e) => setUser(e.target.value)}
                              required
                              placeholder='Keanu'
                              aria-invalid={validUser ? 'false' : 'true'}
                              aria-describedby='uidnote'
                              onFocus={() => setUserFocus(true)}
                              onBlur={() => setUserFocus(false)}
                           />
                           <p id='uidnote' className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              4 to 24 characters. <br />
                              Must begin with a letter. <br />
                              Letters, numbers, underscores, hyphens allowed.
                           </p>
                        </div>
                        {/*=======EMAIL=======*/}
                        <div className='input flex direction-col'>
                           <Err message={errEmailMsg} />
                           <Label htmlFor={"email"} label={"Email"} value={email} validValue={validEmail}/>
                           <input
                              id="email"
                              type="text"
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="on"
                              required
                              placeholder='example@mail.com'
                              aria-invalid={validEmail ? 'false' : 'true'}
                              aria-describedby='mailidnote'
                              onFocus={() => setEmailFocus(true)}
                              onBlur={() => setEmailFocus(false)}
                           />
                           <p id='mailidnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Email example: <br />
                              someemail@email.com
                           </p>
                        </div>
                        {/*=======Password=======*/}
                        <div className='input flex direction-col'>
                           <Err message={errPwdMsg} />
                           <Label htmlFor={"password"} label={"Password"} value={pwd} validValue={validPwd}/>
                           <input
                              id="password"
                              type="password"
                              onChange={(e) => setPwd(e.target.value)}
                              required
                              autoComplete='off'
                              placeholder='12345'
                              aria-invalid={validPwd ? 'false' : 'true'}
                              aria-describedby='pwdnote'
                              onFocus={() => setPwdFocus(true)}
                              onBlur={() => setPwdFocus(false)}
                           />
                           <p id='pwdnote' className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              8 to 24 characters. <br />
                              Must include uppercase and lowercase letters, a number and a special character. <br />
                              Allowed special characters: <span aria-label="dot">.</span><span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span>
                              <span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                           </p>
                        </div>
                        {/*=======Confirm Password=======*/}
                        <div className='input flex direction-col'>
                        <Label htmlFor={"confirm_pwd"} label={"Comfirm Password"} value={matchPwd} validValue={validMatchPwd}/>
                           <input
                              id="confirm_pwd"
                              type="password"
                              onChange={(e) => setMatchPwd(e.target.value)}
                              required
                              autoComplete='off'
                              placeholder='12345'
                              aria-invalid={validMatchPwd ? 'false' : 'true'}
                              aria-describedby='confirmnote'
                              onFocus={() => setMatchFocus(true)}
                              onBlur={() => setMatchFocus(false)}
                           />
                           <p id='confirmnote' className={matchFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Must match the first password input field.
                           </p>
                        </div>
                        {/*=======Button=======*/}

                        <button className='btn' disabled={isLoading}>
                           <span>Sign Up</span>
                        </button>

                     </form>
                  </div>

         }
      </section >

   )

}

export default RegisterForm

