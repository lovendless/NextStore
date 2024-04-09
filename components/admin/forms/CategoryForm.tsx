'use client'

import Label from "@/components/UI/label/Label";
import { Err } from "@/components/UI/messages/Err";
import { Valid } from "@/components/UI/messages/Valid";
import AlertModal from "@/components/UI/modals/AlertModal";
import Select from "@/components/UI/select/Select";
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import axios from "@/config/axios";
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { FormEventHandler, useEffect, useRef, useState } from "react";

const NAME_REGEX = /^[a-zA-Zа-яА-Я]+\-?[a-zA-Zа-яА-Я]{1,20}$/;

interface CategoryFormProps {
   initialData: Category & { billboard: Billboard } | null,
   billboards: Billboard[]
}

export type FormattedBillboards = {
   value: string,
   name: string
}

export default function CategoryForm(
   {
      initialData,
      billboards
   }: CategoryFormProps
) {
   const params = useParams();

   const formattedBillboards: FormattedBillboards[] = billboards?.map((billboard: Billboard) => ({
      value: billboard?.id,
      name: billboard?.label
   }));

   const [isLoading, setIsLoading] = useState(false);

   const [open, setOpen] = useState(false);

   const [name, setName] = useState(initialData ? initialData.name : "");
   const [nameValid, setNameValid] = useState(false);
   const [nameErrMsg, setNameErrMsg] = useState('');
   const nameRef = useRef<HTMLInputElement>(null!);

   const [billboard, setBillboard] = useState(initialData ? initialData?.billboardId : "");
   const [billboardValid, setBillboardValid] = useState(false);
   const [billboardErrMsg, setBillboardErrMsg] = useState('');

   const [errMsg, setErrMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const title = initialData ? "Edit category" : "Create category";
   const description = initialData ? "Edit a category" : "Add a new category";
   const message = initialData ? "Category updated." : "Category created.";
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

   useEffect(() => {

      if (billboard) {
         setBillboardValid(true);
      } else {
         setBillboardValid(false);
      }

   }, [billboard]);

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()

      const v1 = NAME_REGEX.test(name);
      !v1 ? setNameErrMsg("Incorrect Name") : setNameErrMsg("");

      if (!v1) {
         return setErrMsg('Error')
      }

      const formData = new FormData(e.currentTarget);

      try {
         setIsLoading(true);
         if (initialData) {
            await axios.patch(`/api/admin/category/${params.categoryId}`,
               JSON.stringify({
                  name: formData.get('name'),
                  billboardId: formData.get('billboard')
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         } else {
            await axios.post('/api/admin/category',
               JSON.stringify({
                  name: formData.get('name'),
                  billboardId: formData.get('billboard')
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         }

         setSuccessMsg(message);
         setName('');
         window.location.assign(`/admin/${params.userId}/categories`)
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
         await axios.delete(`/api/admin/category/${params.categoryId}`,
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         window.location.assign(`/admin/${params.userId}/categories`);
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
                     onChange={(e) => setName(e.target.value.toLowerCase())}
                     value={name}
                     required
                  />
               </div>

               {/*=======Category=======*/}
               <div className='input flex direction-col' style={{ marginRight: 'auto' }}>
                  <Err
                     message={billboardErrMsg}
                  />
                  <Label
                     htmlFor={"billboard"}
                     label={"Billboard"}
                     value={billboard}
                     validValue={billboardValid}
                  />
                  <Select
                     id={"billboard"}
                     name={"billboard"}
                     options={formattedBillboards}
                     placeholder={"Select a billboard"}
                     value={billboard}
                     defaultName={initialData?.billboard?.label}
                     onChange={(value) => setBillboard(value)
                     } />
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