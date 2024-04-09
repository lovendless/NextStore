
interface SkeletonProps {
   title?: Boolean,
   p?: Boolean,
   square?: Boolean
   button?: Boolean,
   desc?: Boolean
}

export default function Skeleton(
   { title,
      p,
      square,
      button,
      desc
   }: SkeletonProps
) {
   return (
      <div className={title ? `skeleton-title` : p ? `skeleton-p` : square ? `skeleton-square` : button ? `skeleton-button` : desc ? `skeleton-desc` : `skeleton-wrapper`} >

         <div className="skeleton-indicator" />

      </div>
   )
}
