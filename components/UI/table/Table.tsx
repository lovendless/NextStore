'use client'
import { TableColumn } from "@/app/(admin)/(routes)/admin/[userId]/page";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useMemo, useState } from "react";
import CellAction from "../cell-action/CellAction";

export default function Table(
   {
      columns,
      data,
      href
   }: {
      columns: TableColumn[],
      data: any[] | undefined,
      href: string | undefined
   }) {

   const [search, setSearch] = useState('');

   const [currentPage, setCurrentPage] = useState(1);

   const [pagination, setPagination] = useState(true);

   const totalData = data?.length!;

   const take = 2;

   const totalPages = Math.ceil(totalData / take);

   const slicedData = useMemo(() => {

      if (search) {
         setPagination(false)
         return data?.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));
      }

      if (!pagination) {
         setPagination(true)
      }

      return data?.slice((currentPage - 1) * take, currentPage * take);


   }, [currentPage, search, data, pagination]);

   return (
      <div style={{ gap: "20px", }} className="flex direction-col ">

         <input
            className="table-search-input"
            style={{ width: `calc(100%/${columns.length})` }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />

         <div className="table flex direction-col">
            <div className="table__header">
               <div className="table__row flex al-items-center justify-content-bw">
                  {columns.map((column) => (
                     <div key={column.accessorKey} style={{ width: `calc(100%/${columns.length})` }} className="table__column">
                        <h3>{column.header}</h3>
                     </div>
                  ))}
               </div>
            </div>
            <div className="table__body">
               {
                  slicedData?.length! ?
                     slicedData?.map((data) => (
                        <Link key={data.id} href={href ? `${href}/${data.id}` : '#'} className="table__row table__row--click flex al-items-center justify-content-bw">
                           {
                              columns.map((column) => (
                                 <div key={column.accessorKey} style={{ width: `calc(100%/${columns.length})` }} className="table__column">
                                    <h3>{data[column.accessorKey]}</h3>
                                    {
                                       column.accessorKey == 'action' &&
                                       <CellAction
                                          id={data.id}
                                          cellId={column.cellId!}
                                          cellOpenUpdate={column.cellOpenUpdate!}
                                          cellOpenDelete={column.cellOpenDelete!}
                                       />
                                    }
                                 </div>
                              ))
                           }
                        </Link>
                     )) :
                     <div className="table__row flex al-items-center justify-content-bw">
                        <h3>No results.</h3>
                     </div>
               }
            </div>
         </div >
         <div className="table__pagination flex justify-content-end">
            <button className="table-btn" disabled={currentPage == 1 || !pagination || !totalPages ? true : false} onClick={() => setCurrentPage((prev) => prev - 1)}>Prev</button>
            <button className="table-btn" disabled={currentPage == totalPages || !pagination || !totalPages ? true : false} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
         </div>
      </div>
   )

}