'use client'
import { Tab } from "@headlessui/react"
import { Image as ImageType } from '@/new-types'
import Image from "next/image"

interface GalleryProps {
   image: ImageType
}

const GalleryTab: React.FC<GalleryProps> = (
   {
      image
   }
) => {
   return (
      <Tab className="gallery__tab">
         {({selected}) => (
            <div>
               <span className="gallery__image">
                  <Image
                  fill
                  src={image?.url}
                  alt="Image"
                  className="gallery-image"
                  sizes='auto' 
                  priority />
               </span>
               <span className={selected ? "ring-image active" : "ring-image"} />
            </div>
         )}
      </Tab>
   )
}

export default GalleryTab;