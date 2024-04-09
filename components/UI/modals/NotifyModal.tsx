'use client'
import Modal from "@/components/UI/modals/Modal";
import { FormEventHandler, useEffect, useState } from "react";
import Label from "../label/Label";
import { Err } from "../messages/Err";
import axios from "@/config/axios";
import { Product, ProductCity } from "@/new-types";
import { useCurrentCity } from "@/hooks/useCurrentCity";

interface NotifyModalProps {
   data: Product,
   isOpen: Boolean,
   onClose: () => void,
}

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function NotifyModal(
   {
      data,
      isOpen,
      onClose,
   }: NotifyModalProps
) {

   const [isMounted, setIsMounted] = useState(false);

   const currentCity = useCurrentCity(state => state.currentCity);

   const [email, setEmail] = useState('');
   const [emailValid, setEmailValid] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [emailErrMsg, setEmailErrMsg] = useState('');

   useEffect(() => {
      setIsMounted(true)
   }, []);

   useEffect(() => {
      // @ts-ignore
      const result = EMAIL_REGEX.test(email);

      if (result) {
         setEmailValid(true)
      } else {
         setEmailValid(false)
      }

   }, [email]);

   const onConfirm: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      try {
         setIsLoading(true);
         await axios.post(`/api/notify/${data?.id}`,
            JSON.stringify({
               cityId: currentCity?.id,
               email: formData.get('email')
            }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         onClose();
      } catch (err: any) {
         if (!err?.response) {
            setEmailErrMsg('No Server Response');
         } else {
            setEmailErrMsg('Something Went Wrong!');
         }
      } finally {
         setIsLoading(false);
      }
   };

   if (!isMounted) return null

   return (
      <Modal
         title={"Enter your email"}
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className="notify-modal">
            <form onSubmit={(e) => onConfirm(e)}>
               <div className='input flex direction-col'>
                  <Err
                     message={emailErrMsg}
                  />
                  <Label
                     htmlFor={'email'}
                     label={'Email'}
                     value={email}
                     validValue={emailValid}
                  />
                  <input
                     style={{ border: "1px solid #ccc" }}
                     id="email"
                     name="email"
                     type="text"
                     autoComplete='on'
                     // @ts-ignore
                     onChange={(e) => setEmail(e.target.value)}
                     // @ts-ignore
                     value={email}
                     required
                  />
               </div>
               <div className="flex align-items-center justify-end" style={{ paddingTop: "1.5rem", gap: "10px" }}>
                  <button className="btn admin" disabled={isLoading} onClick={onClose}>
                     Cancel
                  </button>
                  <button className="btn " disabled={isLoading}>
                     Confirm
                  </button>
               </div>
            </form>
         </div>

      </Modal>
   )
}