'use client'
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import Table from "../../UI/table/Table";
import { Plus } from "lucide-react";
import AddCityModal from "@/components/UI/modals/AddCityModal";
import { FormEventHandler, useState } from "react";
import { FormattedAvailableCities } from "../forms/ProductForm";
import axios from "@/config/axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/UI/modals/AlertModal";

export default function ProductCityTable(
   {
      data,
   }: {
      data: FormattedAvailableCities[] | undefined,
   }
) {

   const params = useParams();
   const router = useRouter();

   const [openCityModal, setOpenCityModal] = useState(false);
   const [openAlertModal, setOpenAlertModal] = useState(false);
   const [cityId, setCityId] = useState('');

   const [isLoading, setIsLoading] = useState(false);
   const [errMsg, setErrMsg] = useState('');


   const columns: TableColumn[] = [
      {
         accessorKey: 'name',
         header: 'City'
      },
      {
         accessorKey: 'quantity',
         header: 'Available'
      },
      {
         accessorKey: "action",
         cell: <Plus />,
         cellOpenUpdate: (value: boolean) => setOpenCityModal(value),
         cellOpenDelete: (value: boolean) => setOpenAlertModal(value),
         cellId: (itemId: string) => setCityId(itemId)
      }
   ];

   const onCityManage: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      try {
         setIsLoading(true);
         await axios.post(`/api/admin/productcity/${params.productId}`,
            JSON.stringify({
               cityId: formData.get('city'),
               quantity: Number(formData.get('quantity'))
            }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         router.refresh();
         setOpenCityModal(false);
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
            setErrMsg('Something Went Wrong!');
         }
      } finally {
         setIsLoading(false);
      }
   };

   const onCityDelete = async () => {
      try {
         setIsLoading(true);

         await axios.delete(`/api/admin/productcity/${params.productId}`,
            {
               data: JSON.stringify({
                  cityId
               }),
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            });

         router.refresh();
         setOpenAlertModal(false);
      } catch (err: any) {
         if (!err?.response) {
            //setErrMsg('No Server Response');
         } else if (err?.response?.status === 400) {
            //setErrMsg(err?.response?.data?.message);
         } else {
            //setErrMsg('Failed');
         }
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={openAlertModal}
            isLoading={isLoading}
            onClose={() => setOpenAlertModal(false)}
            onConfirm={() => onCityDelete()}
         />
         <AddCityModal
            cityId={cityId}
            setCityId={setCityId}
            initialData={data}
            isOpen={openCityModal}
            isLoading={isLoading}
            errMsg={errMsg}
            onClose={() => setOpenCityModal(false)}
            onConfirm={(e) => onCityManage(e)}
         />
         <div className="product-city flex direction-col" style={{ gap: '20px', width: '35%', marginLeft: 'auto' }}>
            <div className="flex justify-content-bw al-items-center">
               <h3 style={{ color: "#696969", letterSpacing: '1px' }}>Available Cities</h3>
               <button className="btn admin flex al-items-center" onClick={() => setOpenCityModal(true)}>
                  <Plus style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                  <span>Add City</span>
               </button>
            </div>
            <Table columns={columns} data={data} href={''} />
         </div>
      </>
   )
}