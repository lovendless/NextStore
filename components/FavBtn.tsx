'use client'
import { Heart } from "lucide-react";
import { useFavProducts } from "@/hooks/useFavProducts";
import { useCallback, useEffect, useState } from "react";
import getFavCookie from "@/actions/get-cookie-fav";
import { useRouter } from "next/navigation";
import { useMenu } from "@/hooks/useMenu";

export default function FavBtn(
   {
      fav
   }: {
      fav: string[]
   }
) {

   const router = useRouter();

   const { isMenu } = useMenu();

   const [favIds, setFavIds] = useState<string[]>(fav ? fav : []);

   const { isRefetch, setIsRefetch } = useFavProducts();

   const getFavorites = useCallback(async () => {
      const favs = await getFavCookie();
      setFavIds(favs);
   }, [setFavIds]);

   useEffect(() => {
      if (isRefetch) {
         getFavorites();
         setIsRefetch(false);
      }
   }, [isRefetch, getFavorites, setIsRefetch]);

   return (
      <div>
         <button className="btn fav-link flex al-items-center" onClick={() => router.push('/f')}>
            <Heart />
            {isMenu && <span>Favorites</span>}
            {favIds?.length > 0 && <span className="fav-link__amount">{favIds?.length}</span>}
         </button>
      </div>
   )
}
