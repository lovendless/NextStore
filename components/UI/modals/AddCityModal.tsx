'use client'

import Modal from "@/components/UI/modals/Modal";
import { useEffect, useMemo, useState } from "react";
import Popover from "../popover/Popover";
import { usePlaces } from "@/hooks/usePlaces";
import { useSort } from "@/hooks/useSort";
import { AlertModalProps } from "./AlertModal";
import { Err } from "../messages/Err";
import Label from "../label/Label";
import { FormattedAvailableCities } from "@/components/admin/forms/ProductForm";
import { useFindValue } from "@/hooks/useFindValue";

//IF HYDRATION ERROR

interface AddCityModalProps {
   cityId: string,
   setCityId: (value: string) => void,
   initialData: FormattedAvailableCities[] | undefined,
   errMsg: string
}

const QUANTITY_REGEX = /^[0-9]{1,6}$/;

export default function AddCityModal(
   {
      cityId,
      setCityId,
      initialData,
      isOpen,
      isLoading,
      errMsg,
      onClose,
      onConfirm
   }: AlertModalProps & AddCityModalProps
) {

   const [isMounted, setIsMounted] = useState(false);
   
   const [query, setQuery] = useState('');

   const [quantity, setQuantity] = useFindValue("", initialData, cityId, 'quantity');
   const [name, setName] = useFindValue("", initialData, cityId, 'name');

   const [quantityValid, setQuantityValid] = useState(false);
   const [quantityErrMsg, setQuantityErrMsg] = useState('');

   const [places, loading, error] = usePlaces(query);
   
   const sortedPlaces = useSort(places);
   
   useEffect(() => {

      setIsMounted(true);

   }, []);

   useEffect(() => {
      // @ts-ignore
      const result = QUANTITY_REGEX.test(quantity);

      if (result) {
         setQuantityValid(true)
      } else {
         setQuantityValid(false)
      }

   }, [quantity]);


   if (!isMounted) return null;

   return (
      <Modal
         title={'Select a city.'}
         isOpen={isOpen}
         onClose={onClose}
      >
         <form className="flex justify-content-bw" onSubmit={onConfirm} >
            <Err message={errMsg} />
            <Popover
               initialData={initialData}
               searchedData={sortedPlaces}
               id={'city'}
               name={'city'}
               value={cityId}
               title={"Cities"}
               // @ts-ignore
               defaultName={name}
               placeholder={"Select a city"}
               isLoading={loading}
               isError={error}
               onSearch={(value) => setQuery(value)}
               onChange={(value) => setCityId(value)}
            />
            {
               isLoading ?
                  <div className="flex " style={{ height: "50px", width: "50px" }}>
                     <div className="loader">
                     </div>
                  </div> :
                  cityId &&
                  <div className='input flex direction-col' style={{ marginRight: 'auto' }}>
                     <Err
                        message={quantityErrMsg}
                     />
                     <Label
                        htmlFor={"quantity"}
                        label={"Quantity"}
                        // @ts-ignore
                        value={quantity}
                        validValue={quantityValid}
                     />
                     <input
                        style={{ border: "1px solid #ccc" }}
                        id="quantity"
                        name="quantity"
                        type="number"
                        autoComplete='on'
                        // @ts-ignore
                        onChange={(e) => setQuantity(e.target.value)}
                        // @ts-ignore
                        value={quantity}
                        required
                     />
                  </div>
            }
            <div className="flex align-items-center justify-end" style={{ paddingTop: "1.5rem", gap: "10px" }}>
               <button className="btn admin" disabled={isLoading} onClick={onClose}>
                  Cancel
               </button>
               <button className="btn " disabled={isLoading}>
                  Continue
               </button>
            </div>
         </form>
      </Modal>
   )
}
