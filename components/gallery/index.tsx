'use client'
import { Tab, Transition } from "@headlessui/react"
import { Image as ImageType } from '@/new-types'
import GalleryTab from "./GalleryTab"
import Image from "next/image"
import { useState } from "react"

interface GalleryProps {
   images: ImageType[] | undefined
}

const Gallery: React.FC<GalleryProps> = (
   {
      images
   }
) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   return (
      <>
         <Tab.Group as="div" className='gallery' selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="gallery__show-pics">
               {images?.map(image => (
                  <GalleryTab key={image.id} image={image} />
               ))}
            </Tab.List>
            <Tab.Panels className="gallery__select-pics">
               {images?.map((image, idx) => (

                  <Tab.Panel key={image.id}>
                     <Transition
                        as='div'
                        appear={true}
                        show={selectedIndex == idx}
                        enter="tab-enter"
                        enterFrom="tab-enter-from"
                        enterTo="tab-enter-to"
                     >
                     <div className="gallery__panel">
                        <Image
                           fill
                           src={image?.url}
                           alt="Image"
                           className="gallery-image"
                           sizes='auto'
                           priority />
                     </div>
                     </Transition>
                  </Tab.Panel>
               ))}
            </Tab.Panels>
         </Tab.Group>
      </>
   )
}

export default Gallery;