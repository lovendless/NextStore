import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//forgot pwd
export async function POST(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {
      const body = await req.json();
      const { email, cityId} = body;

      console.log(email, cityId, params.productId);

      if (!email) {
         return NextResponse.json({ message: "Email is required!" }, { status: 400 })
      }
      if (!params.productId) {
         return NextResponse.json({ message: "ProductId is required!" }, { status: 400 })
      }
      if (!cityId) {
         return NextResponse.json({ message: "CityId is required!" }, { status: 400 })
      }

      await db.productNotify.create({
         data: {
            productId: params.productId,
            cityId,
            email
         }
      });

      return NextResponse.json({ email, message: "Email has been sent successfully" }, { status: 201 });

   } catch (err) {
      console.log('[NOTIFYEMAIL_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}