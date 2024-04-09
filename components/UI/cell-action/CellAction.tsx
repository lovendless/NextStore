'use client'
import { faEllipsis, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react"

interface CellActionProps {
   id: string,
   cellId: (dataId: string) => void
   cellOpenUpdate: (value: boolean) => void | undefined,
   cellOpenDelete: (value: boolean) => void | undefined,
}

function CellAction(
   {
      id,
      cellId,
      cellOpenUpdate,
      cellOpenDelete
   }: CellActionProps
) {

   const [isMounted, setIsMounted] = useState(false);

   const [open, setOpen] = useState(false);

   const cellActionRef = useRef<HTMLDivElement>(null!);
   const cellActionListRef = useRef<HTMLDivElement>(null!);

   useEffect(() => {

      setIsMounted(true);

   }, []);

   const handleClick = (openType: string) => {
      cellId(id);

      if (openType == 'update') {
         cellOpenUpdate(true);
      } else {
         cellOpenDelete(true);
      }

      setOpen(false);
   };

   if (!isMounted) return null

   return (
      <>
         <div className={open ? "cell active" : "cell"}>
            <div ref={cellActionRef} className="cell__head flex al-items-center justify-content-center" onClick={() => setOpen((prev) => !prev)} style={{ textTransform: 'capitalize' }}>
               <FontAwesomeIcon className="cell-ellipsis" icon={faEllipsis} />
            </div>
            <div ref={cellActionListRef} className="cell__body flex direction-col" style={{ paddingLeft: "5px", paddingRight: "5px", gap: "5px" }}>
               <p style={{ color: "#696969" }}>Actions</p>
               <button className="cell__btn flex justify-start" onClick={() => handleClick('update')}>
                  <FontAwesomeIcon className="cell__btn--icon" icon={faPenToSquare} />
                  <p>Update</p>
               </button>
               <button className="cell__btn flex justify-start" onClick={() => handleClick('delete')}>
                  <FontAwesomeIcon className="cell__btn--icon" icon={faTrashCan} />
                  <p >Delete</p>
               </button>
            </div>
         </div>
      </>
   )
}

export default CellAction