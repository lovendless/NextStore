'use client'
import { Product } from "@/new-types"
import { Heart } from "lucide-react"
import Image from "next/image"
import { Currency } from "./UI/currency/Currency"
import Link from "next/link"
import { Available } from "./available/Available"
import IconButton from "./UI/icon-btn/IconButton"
import { useCallback, useEffect, useState } from "react"
import { useFavProducts } from "@/hooks/useFavProducts"
import updateFavCookie from "@/actions/post-cookie-fav"
import getFavCookie from "@/actions/get-cookie-fav"
import { useRouter } from "next/navigation"

interface ProductCardProps {
   data: Product,
   favCookie: string[]
}

export const ProductCard: React.FC<ProductCardProps> = (
   {
      data,
      favCookie
   }
) => {

   const router = useRouter();

   const [favIds, setFavIds] = useState<string[]>(favCookie ? favCookie : []);

   const { isRefetch, setIsRefetch } = useFavProducts();

   const [mouseOver, setMouseOver] = useState<Boolean>(false);

   const getFavorites = useCallback(async () => {
      const favs = await getFavCookie();
      setFavIds(favs);
   }, [setFavIds]);

   useEffect(() => {
      getFavorites();
   }, [getFavorites]);

   useEffect(() => {
      if (isRefetch) {
         getFavorites();
         setIsRefetch(false);
      }
   }, [isRefetch, getFavorites, setIsRefetch]);

   const onClickFav = async (productId: string) => {

      try {

         await updateFavCookie(productId);

         setIsRefetch(true);

         router.refresh();

      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className="product-card flex direction-col product-card-size-default goods-grid__cell-size">
         {/* Image and Actions */}
         <div className="product-card__image ">
            <Link href={`/p/${data?.id}`} onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}> 
               <Image className="card-image" src={mouseOver ? data?.images?.[1]?.url ?? data?.images?.[0]?.url : data?.images?.[0]?.url} alt={data?.name} fill sizes="auto" priority />
            </Link>
            <div className="product-card__image-icons">
               <div className="product-card__image-icons-flex">
                  <IconButton onClick={() => onClickFav(data.id)} icon={<Heart fill={favIds?.includes(data.id) ? "#ec376f" : "transparent"} />} className={"like"} />
               </div>
            </div>
         </div>
         {/* Description */}
         <div className="product-card__description flex direction-col">
            <h3>
               {data?.name}
            </h3>
            <p>
               {data?.category?.name}
            </p>
         </div>
         {/* Price */}
         <div>
            <Currency value={data?.price} />
         </div>
         {/* Available */}
         <div>
            <Available data={data} />
         </div>
      </div>
   )
}

