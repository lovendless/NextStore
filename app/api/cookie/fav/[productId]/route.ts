
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {
      const nextCookies = cookies();

      if (!params.productId) {
         return NextResponse.json({ message: "ProductId is required!" }, { status: 400 })
      }

      let prevFav = nextCookies.get('fav')?.value;

      if (!prevFav) {
         return NextResponse.json({ fav: [params.productId] }, { status: 200, headers: { "Set-Cookie": `fav=${params.productId};path=/;` } });
      }

      let prevFavArray = prevFav?.split(',');

      if (prevFavArray?.includes(params.productId)) {
         const filteredArray = prevFavArray.filter(item => item !== params.productId);

         prevFav = filteredArray.join().replaceAll(',', '%2C');

         return NextResponse.json({ fav: filteredArray }, { status: 200, headers: { "Set-Cookie": `fav=${prevFav};path=/;` } });
      }

      prevFav = prevFav.replaceAll(',', '%2C');

      prevFav += `%2C${params.productId}`

      return NextResponse.json({ fav: [...prevFavArray, params.productId] }, { status: 200, headers: { "Set-Cookie": `fav=${prevFav};path=/;` } });

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}