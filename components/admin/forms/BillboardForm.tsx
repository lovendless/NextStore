'use client'

import Checkbox from "@/components/UI/checkbox/Checkbox";
import ImageInput from "@/components/UI/input/ImageInput";
import Label from "@/components/UI/label/Label";
import { Err } from "@/components/UI/messages/Err";
import { Valid } from "@/components/UI/messages/Valid";
import AlertModal from "@/components/UI/modals/AlertModal";
import Separator from "@/components/UI/separator/Separator";
import Heading from "@/components/admin/Heading"
import axios from "@/config/axios";
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { FormEventHandler, useEffect, useRef, useState } from "react";

const LABEL_REGEX = /^[a-zA-Zа-яА-Я]+\-?[a-zA-Zа-яА-Я ]{1,20}$/;

export default function BillboardForm(
   {
      initialData
   }: {
      initialData: Billboard | null
   }
) {

   const params = useParams();

   const [isLoading, setIsLoading] = useState(false);

   const [open, setOpen] = useState(false);

   const [selectedImage, setSelectedImage] = useState<string[]>(initialData ? [initialData.imageUrl] : []);
   const [selectedFile, setSelectedFile] = useState<File>();
   const fileRef = useRef<HTMLInputElement>(null!);

   const isFeatured = useRef<HTMLInputElement>(null!);
   const [feat, setFeat] = useState(initialData ? initialData?.isFeatured : false);

   const [label, setLabel] = useState(initialData ? initialData.label : "");
   const [labelValid, setLabelValid] = useState(false);
   const [labelErrMsg, setLabelErrMsg] = useState('');

   const labelRef = useRef<HTMLInputElement>(null!);

   const [errMsg, setErrMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const title = initialData ? "Edit billboard" : "Create billboard";
   const description = initialData ? "Edit a billboard" : "Add a new billboard";
   const message = initialData ? "Billboard updated." : "Billboard created.";
   const action = initialData ? "Update" : "Create";

   const uploadImageUrl = useRef(initialData ? initialData.imageUrl : '');

   const maxImages = 1;

   useEffect(() => {
      labelRef.current.focus();
   }, [])

   useEffect(() => {

      const result = LABEL_REGEX.test(label);

      if (result) {
         setLabelValid(true);
      } else {
         setLabelValid(false);
      }

   }, [label]);

   useEffect(() => {

      if (label) {
         setLabelErrMsg('');
         setErrMsg('');
         setSuccessMsg('')
      }

   }, [label]);

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()

      const v1 = LABEL_REGEX.test(label);
   
      !v1 ? setLabelErrMsg("Incorrect Label") : setLabelErrMsg("");

      if (!v1) {
         return setErrMsg('Error')
      }

      const formData = new FormData(e.currentTarget);

      try {
         setIsLoading(true);

         if (selectedFile) {

            formData.append("file", selectedFile);

            const res = await axios.post("/api/admin/upload/billboard", formData);

            fileRef.current.value = null!;

            const newImageUrl = res.data.name;

            uploadImageUrl.current = `/public/billboards/${newImageUrl}`;

         }

         if (initialData) {
            await axios.patch(`/api/admin/billboard/${params.billboardId}`,
               JSON.stringify({
                  label: formData.get('label'),
                  imageUrl: uploadImageUrl.current,
                  isFeatured: isFeatured.current.checked,
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         } else {
            await axios.post('/api/admin/billboard',
               JSON.stringify({
                  label: formData.get('label'),
                  imageUrl: uploadImageUrl.current,
                  isFeatured: isFeatured.current.checked,
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         }

         setSuccessMsg(message);
         setLabel('');
         window.location.assign(`/admin/${params.userId}/billboards`)
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
         await axios.delete(`/api/admin/billboard/${params.billboardId}`,
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         window.location.assign(`/admin/${params.userId}/billboards`);
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

   const onImageChange = (e: any) => {

      const file = e.target.files[0];

      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = function (event) {
         const result = event?.target?.result;

         setSelectedImage((prev: string[]) => {
            if (!result) return [...prev];
            return [result.toString()]
         });

      };

      reader.readAsDataURL(file);

   }


   const onImageDelete = (url: string, index: Number) => {

      setSelectedImage([]);

      setSelectedFile(undefined);

      if (!selectedFile) fileRef.current.value = null!

   };


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
               {/*=======Images=======*/}
               <ImageInput fileRef={fileRef} selectedImages={selectedImage} maxImages={maxImages} onChange={onImageChange} onClick={onImageDelete} />
               {/*=======Name=======*/}
               <div className='input flex direction-col' >
                  <Err message={labelErrMsg} />
                  <Label htmlFor={"label"} label={"Label"} value={label} validValue={labelValid} />
                  <input
                     style={{ border: "1px solid #ccc" }}
                     id="label"
                     name="label"
                     type="text"
                     ref={labelRef}
                     autoComplete='on'
                     onChange={(e) => setLabel(e.target.value.toLowerCase())}
                     value={label}
                     required
                  />
               </div>

                {/*=======isFeatured=======*/}
                <div className='input flex'>
                     <Checkbox
                        id={"featured"}
                        name={"featured"}
                        checkboxRef={isFeatured}
                        label={"isFeatured"}
                        checked={feat}
                        onChange={() => setFeat(!feat)}
                     />
                  </div>

               {/*=======Button=======*/}

               <button disabled={isLoading} className='btn admin flex al-items-center' >
                  <span>{action}</span>
               </button>
            </form>
         </section>
      </>
   )
}


