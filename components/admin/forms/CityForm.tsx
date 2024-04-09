'use client'

import Checkbox from "@/components/UI/checkbox/Checkbox";
import Label from "@/components/UI/label/Label";
import { Err } from "@/components/UI/messages/Err";
import { Valid } from "@/components/UI/messages/Valid";
import AlertModal from "@/components/UI/modals/AlertModal";
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import axios from "@/config/axios";
import { City } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { FormEventHandler, useEffect, useRef, useState } from "react";

const NAME_REGEX = /^[a-zA-Zа-яА-Я]+\-?[a-zA-Zа-яА-Я]{1,20}$/;

export default function CityForm(
   {
      initialData
   }: {
      initialData: City | null
   }
) {
   const params = useParams();

   const [isLoading, setIsLoading] = useState(false);

   const [open, setOpen] = useState(false);

   const [name, setName] = useState(initialData ? initialData.name : "");
   const [nameValid, setNameValid] = useState(false);
   const [nameErrMsg, setNameErrMsg] = useState('');
   const nameRef = useRef<HTMLInputElement>(null!);

   const defaultCity = useRef<HTMLInputElement>(null!);
   const [def, setDef] = useState(initialData ? initialData?.default : false);


   const [errMsg, setErrMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const title = initialData ? "Edit city" : "Create city";
   const description = initialData ? "Edit a city" : "Add a new city";
   const message = initialData ? "City updated." : "City created.";
   const action = initialData ? "Update" : "Create"

   useEffect(() => {
      nameRef.current.focus();
   }, []);

   useEffect(() => {
      if (name) {
         setNameErrMsg('');
         setErrMsg('');
         setSuccessMsg('')
      }

      const result = NAME_REGEX.test(name);

      if (result) {
         setNameValid(true);
      } else {
         setNameValid(false);
      }

   }, [name]);

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()

      const v1 = NAME_REGEX.test(name);
      !v1 ? setNameErrMsg("Incorrect Name") : setNameErrMsg("");

      if (!v1) {
         return setErrMsg('Error')
      }

      try {
         setIsLoading(true);
         if (initialData) {
            await axios.patch(`/api/admin/city/${params.cityId}`,
               JSON.stringify({
                  name: name.toLowerCase(),
                  defaultCity: defaultCity.current.checked
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         } else {
            await axios.post('/api/admin/city',
               JSON.stringify({
                  name: name.toLowerCase(),
                  defaultCity: defaultCity.current.checked
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         }

         setSuccessMsg(message);
         setName('');
         window.location.assign(`/admin/${params.userId}/cities`);
      } catch (err: any) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } else if (err?.response?.status === 403) {
            setErrMsg(err?.response?.data?.message);
         } else if (err?.response?.status === 409) {
            setErrMsg(err?.response?.data?.message);
         } else if (err?.response?.status === 400) {
            setErrMsg(err?.response?.data?.message);
         } else {
            setErrMsg('Failed');
         }
         //errRef.current.focus();
      } finally {
         setIsLoading(false)
      }

   }

   const onDelete = async () => {
      try {
         setIsLoading(true);
         await axios.delete(`/api/admin/city/${params.cityId}`,
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         window.location.assign(`/admin/${params.userId}/cities`);
      } catch (err: any) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } else if (err?.response?.status === 400) {
            setErrMsg(err?.response?.data?.message);
         } else {
            setErrMsg('Failed');
         }
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            isLoading={isLoading}
            onClose={() => setOpen(false)}
            onConfirm={() => onDelete()}
         />
         <section style={{ gap: "20px" }} className="flex direction-col">
            <div className="flex align-items-center justify-content-bw">
               <Heading title={title} description={description} />
               {
                  initialData && <button className="btn delete" onClick={() => setOpen(true)}>
                     <Trash style={{ height: "1rem", width: "1rem" }} />
                  </button>
               }
            </div>
            <Separator />
            <form className="flex justify-content-bw" style={{ marginRight: "auto" }} onSubmit={handleSubmit}>
               <Valid message={successMsg} />
               <Err message={errMsg} />
               {/*=======Name=======*/}
               <div className='input flex direction-col' >
                  <Err message={nameErrMsg} />
                  <Label htmlFor={"name"} label={"Name"} value={name} validValue={nameValid} />
                  <input
                     style={{ border: "1px solid #ccc" }}
                     id="name"
                     name="name"
                     type="text"
                     ref={nameRef}
                     autoComplete='on'
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                     required
                  />
               </div>
               {/*=======Default=======*/}
               <div className='input flex'>
                  <Checkbox
                     id={"default"}
                     name={"default"}
                     checkboxRef={defaultCity}
                     label={"City by default"}
                     checked={def}
                     onChange={() => setDef(!def)}
                  />
               </div>
               {/*=======Button=======*/}

               <button className='btn admin flex al-items-center' >
                  <span>{action}</span>
               </button>
            </form>
         </section>
      </>
   )
}