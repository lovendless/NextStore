import Skeleton from "./Skeleton"

const SkeletonGallery = () => {
   return (
      <div className='gallery'>
         <div className="gallery__show-pics">
            {Array.from({ length: 3 }).fill('').map((_, idx) => (
               <Skeleton key={idx} square />
            ))}
         </div>
         <div className="gallery__select-pics">
            <Skeleton square />
         </div>
      </div>
   )
}

export default SkeletonGallery;