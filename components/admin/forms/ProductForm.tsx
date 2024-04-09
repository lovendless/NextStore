'use client'

import Label from "@/components/UI/label/Label";
import { Err } from "@/components/UI/messages/Err";
import { Valid } from "@/components/UI/messages/Valid";
import Separator from "@/components/UI/separator/Separator";
import Textarea from "@/components/UI/textarea/Textarea";
import Heading from "@/components/admin/Heading"
import axios from "@/config/axios";
import { ProductImage, Product, Category, City, ProductCity } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import ImageInput from "@/components/UI/input/ImageInput";
import AlertModal from "@/components/UI/modals/AlertModal";
import Select from "@/components/UI/select/Select";
import Checkbox from "@/components/UI/checkbox/Checkbox";
import ProductCityTable from "../tables/ProductCityTable";

const NAME_REGEX = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9\s]{1,50}$/;
const DESC_REGEX = /^[a-zA-Zа-яА-Я0-9\s_-]{1,500}$/;

export interface ProductData {
   images: ProductImage[],
   category: Category,
   availableCities: ProductCity[],
}

export interface ProductFormProps {
   initialData: Product & ProductData | null,
   categories: Category[],
}

export type FormattedCategories = {
   value: string,
   name: string
}

export type FormattedAvailableCities = {
   id: string,
   name: string,
   quantity: string
}

export default function ProductForm(
   {
      initialData,
      categories,
   }: ProductFormProps
) {
   const formattedProduct = JSON.parse(JSON.stringify(initialData));

   const formattedImages = initialData?.images.map((image: { url: string }) => image.url);

   const formattedAvailableCities = formattedProduct?.availableCities.map((availableCity: ProductCity & { city: City }) => ({
      id: availableCity?.city?.id,
      name: availableCity?.city?.name,
      quantity: availableCity?.quantity.toString()
   }));

   const formattedCategories: FormattedCategories[] = categories?.map((category: Category) => ({
      value: category?.id,
      name: category?.name
   }));

   const params = useParams();

   const [isLoading, setIsLoading] = useState(false);

   const [selectedImages, setSelectedImages] = useState<string[]>(formattedImages ? formattedImages : []);
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const fileRef = useRef<HTMLInputElement>(null!);

   const [open, setOpen] = useState(false);

   const [name, setName] = useState(initialData ? initialData?.name : "");
   const [nameValid, setNameValid] = useState(false);
   const [nameErrMsg, setNameErrMsg] = useState('');

   const [price, setPrice] = useState(initialData ? Number(initialData?.price) : "");
   const [priceValid, setPriceValid] = useState(false);
   const [priceErrMsg, setPriceErrMsg] = useState('');

   const [desc, setDesc] = useState(initialData ? initialData?.description : "");
   const [descValid, setDescValid] = useState(false);
   const [descErrMsg, setDescErrMsg] = useState('');

   const [category, setCategory] = useState(initialData ? initialData?.categoryId : "");
   const [categoryValid, setCategoryValid] = useState(false);
   const [categoryErrMsg, setCategoryErrMsg] = useState('');

   const isArchived = useRef<HTMLInputElement>(null!);
   const [archived, setArchived] = useState(initialData ? initialData?.isArchived : false);

   const [errMsg, setErrMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const uploadImageUrls = useRef(formattedImages ? formattedImages.map((imageUrl: string) => ({ url: imageUrl })) : []);

   const maxImages = 3;

   const title = initialData ? "Edit product" : "Create product";
   const description = initialData ? "Edit a product" : "Add a new product";
   const message = initialData ? "Product updated." : "Product created.";
   const action = initialData ? "Update" : "Create";

   useEffect(() => {
      const result = NAME_REGEX.test(name);

      if (result) {
         setNameValid(true);
      } else {
         setNameValid(false);
      }

   }, [name]);

   useEffect(() => {

      if (price) {
         setPriceValid(true);
      } else {
         setPriceValid(false);
      }

   }, [price]);

   useEffect(() => {

      const result = DESC_REGEX.test(desc);

      if (result) {
         setDescValid(true);
      } else {
         setDescValid(false);
      }

   }, [desc]);

   useEffect(() => {

      if (category) {
         setCategoryValid(true);
      } else {
         setCategoryValid(false);
      }

   }, [category]);

   useEffect(() => {
      if (name || price || desc || category) {
         setNameErrMsg('');
         setPriceErrMsg('');
         setDescErrMsg('');
         setCategoryErrMsg('');
      }

   }, [name, price, desc, category]);

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      const v1 = NAME_REGEX.test(name);
      const v2 = DESC_REGEX.test(desc);
      const v3 = priceValid;
      const v4 = categoryValid;
      !v1 ? setNameErrMsg("Incorrect Name") : setNameErrMsg("");
      !v2 ? setDescErrMsg("Incorrect Description") : setDescErrMsg("");
      !v3 ? setPriceErrMsg("Incorrect Price") : setPriceErrMsg("");
      !v4 ? setCategoryErrMsg("Incorrect Category") : setCategoryErrMsg("");

      if (!v1 || !v2 || !v3 || !v4) {
         return setErrMsg('Something went wrong!')
      }

      const formData = new FormData(e.currentTarget);

      try {

         if (selectedFiles.length) {

            for (let selectedFile of selectedFiles) {
               formData.append("file", selectedFile);
            }

            const res = await axios.post("/api/admin/upload/product", formData);

            fileRef.current.value = null!;

            const newImageUrls = res.data.names.map((name: string) => ({
               url: `/public/products/${name}`
            }));

            uploadImageUrls.current = uploadImageUrls.current.concat(newImageUrls)

         }

         if (initialData) {

            await axios.patch(`/api/admin/product/${params.productId}`,
               JSON.stringify({
                  name: formData.get('name'),
                  price: formData.get('price'),
                  description: formData.get("desc"),
                  categoryId: formData.get('category'),
                  images: uploadImageUrls.current,
                  isArchived: isArchived.current.checked,
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });

         } else {

            await axios.post('/api/admin/product',
               JSON.stringify({
                  name: formData.get('name'),
                  price: formData.get('price'),
                  description: formData.get("desc"),
                  categoryId: formData.get('category'),
                  images: uploadImageUrls.current,
                  isArchived: isArchived.current.checked
               }),
               {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
               });
         }

         setSuccessMsg(message);
         setName('');
         setPrice('');
         setDesc('');
         window.location.assign(`/admin/${params.userId}/products`);
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
         await axios.delete(`/api/admin/product/${params.productId}`,
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         window.location.assign(`/admin/${params.userId}/products`);
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
   };

   const onImageChange = (e: any) => {

      const files = e.target.files;

      if (!files.length) return;

      if (files.length > maxImages || selectedFiles.length >= maxImages) {
         return fileRef.current.value = null!;
      }

      for (let file of files) {

         setSelectedFiles((prevState: File[]) => {
            return [...prevState, file]
         });

         const reader = new FileReader();

         reader.onload = function (onLoadEvent) {
            setSelectedImages((prevState: any[]) => {
               if (selectedImages.length == maxImages) {
                  return [...prevState]
               }
               return [...prevState, onLoadEvent?.target?.result]
            });
         };

         reader.readAsDataURL(file);

      }

   };

   const onImageDelete = (url: string, index: Number) => {

      setSelectedImages(selectedImages.filter((imageUrl) => {
         return imageUrl !== url
      }));

      if (!initialData) {
         setSelectedFiles(selectedFiles.filter((_, i) => {
            return i !== index
         }));
      }

      if (uploadImageUrls.current.length) {
         const newUploadImages = uploadImageUrls.current.filter(((imageUrl: { url: string }) => {
            return imageUrl.url !== url
         }));

         uploadImageUrls.current = newUploadImages;
      }

      if (selectedFiles.length == 1) fileRef.current.value = null!

   };

   return (
      <>
         <AlertModal
            isOpen={open}
            isLoading={isLoading}
            onClose={() => setOpen(false)}
            onConfirm={() => onDelete()}
         />
         <section style={{ gap: "20px", letterSpacing: '1px' }} className="flex direction-col">
            <div className="flex al-items-center justify-content-bw">
               <Heading title={title} description={description} />
               {
                  initialData && <button className="btn delete" onClick={() => setOpen(true)}>
                     <Trash style={{ height: "1rem", width: "1rem" }} />
                  </button>
               }
            </div>
            <Separator />
            <div className="forms-wrapper flex">
               <form className="flex justify-content-bw" style={{ maxWidth: "50%" }} onSubmit={handleSubmit} >
                  <Valid message={successMsg} />
                  <Err message={errMsg} />
                  {/*=======Images=======*/}
                  <ImageInput fileRef={fileRef} selectedImages={selectedImages} maxImages={maxImages} onChange={onImageChange} onClick={onImageDelete} />
                  {/*=======Name=======*/}
                  <div className='input flex direction-col' style={{ marginRight: 'auto' }}>
                     <Err message={nameErrMsg} />
                     <Label htmlFor={"name"} label={"Name"} value={name} validValue={nameValid} />
                     <input
                        style={{ border: "1px solid #ccc" }}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete='on'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                     />
                  </div>
                  {/*=======Price=======*/}
                  <div className='input flex direction-col' style={{ marginRight: 'auto' }}>
                     <Err message={priceErrMsg} />
                     <Label htmlFor={"price"} label={"Price"} value={price} validValue={priceValid} />
                     <input
                        style={{ border: "1px solid #ccc" }}
                        id="price"
                        name="price"
                        type="number"
                        autoComplete='on'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                     />
                  </div>
                  {/*=======Description=======*/}
                  <div className='input flex direction-col' >
                     <Err message={descErrMsg} />
                     <Label htmlFor={"desc"} label={"Description"} value={desc} validValue={descValid} />
                     <Textarea id={"desc"} name={"desc"} value={desc} onChange={(e) => setDesc(e.target.value)} />
                  </div>

                  {/*=======Category=======*/}
                  <div className='input flex direction-col' style={{ marginRight: 'auto' }}>
                     <Err
                        message={categoryErrMsg}
                     />
                     <Label
                        htmlFor={"category"}
                        label={"Category"}
                        value={category}
                        validValue={categoryValid}
                     />
                     <Select
                        id={"category"}
                        name={"category"}
                        options={formattedCategories}
                        placeholder={"Select a category"}
                        value={category}
                        defaultName={initialData?.category?.name}
                        onChange={(value) => setCategory(value)
                        } />
                  </div>
                  {/*=======isArchived=======*/}
                  <div className='input flex'>
                     <Checkbox
                        id={"archived"}
                        name={"archived"}
                        checkboxRef={isArchived}
                        label={"IsArchived"}
                        checked={archived}
                        onChange={() => setArchived(!archived)}
                     />
                  </div>

                  {/*=======Button=======*/}

                  <button disabled={isLoading} className='btn admin flex al-items-center' style={{ marginRight: "auto" }}>
                     <span>{action}</span>
                  </button>
               </form>
               <ProductCityTable data={formattedAvailableCities} />
            </div>
         </section >
      </>
   )
}