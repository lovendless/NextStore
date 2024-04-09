'use client'
import { Trash } from "lucide-react";
import Image from "next/image";
import { LegacyRef } from "react";

export default function ImageInput(
   {
      fileRef,
      selectedImages,
      maxImages,
      onChange,
      onClick
   }: {
      fileRef: LegacyRef<HTMLInputElement>,
      selectedImages: string[],
      maxImages: Number,
      onChange: (e: any) => void,
      onClick: (url: string, index: Number) => void
   }
) {

   return (
      <div className='input input-image flex direction-col' style={{ gap: "10px" }}>
         <div className="input-image__selected-block flex align-items-center direction-col">
            <h3 style={{color: "#515151"}}>{`${selectedImages.length} / ${maxImages}`}</h3>
            <div className="input-image__image-list flex align-items-center">
               {selectedImages.length > 0 && (
                  selectedImages.map((url, index) => (
                     <div className="input-image__image-item" key={index}>
                        <button className="btn delete input-image__image-btn" onClick={() => onClick(url, index)}>
                           <Trash style={{ height: ".8rem", width: ".8rem" }} />
                        </button>
                        <Image
                           src={url}
                           width={100}
                           height={100}
                           priority
                           alt={`Picture ${index}`}
                        />
                     </div>
                  ))
               )
               }
            </div>
         </div>
         <input
            ref={fileRef}
            type="file"
            onChange={onChange}
            multiple
            accept=".jpg, .jpeg, .png"
         />
      </div>
   )
}
