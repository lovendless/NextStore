import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {

      const body = await req.json();

      const {
         cityId,
         quantity
      } = body;

      if (!cityId) return NextResponse.json({ message: "CityId is requied" }, { status: 400 });
      if (!params?.productId) return NextResponse.json({ message: "ProductId is requied" }, { status: 400 });
      if (!quantity) return NextResponse.json({ message: "Quantity is requied" }, { status: 400 });

      const existingProductById = await db.product.findUnique({
         where: {
            id: params?.productId
         }
      });

      const existingCityById = await db.city.findUnique({
         where: {
            id: cityId
         }
      });

      if (!existingProductById) {
         return NextResponse.json({ message: "Product with this id is not exist" }, { status: 403 })
      }

      if (!existingCityById) {
         return NextResponse.json({ message: "City with this id is not exist" }, { status: 403 })
      }

      const existingProductCity = await db.productCity.findFirst({
         where: {
            cityId,
            productId: params?.productId
         },
      });

      if (existingProductCity) {
         const updateProductCity = await db.productCity.updateMany({
            where: {
               cityId,
               productId: params?.productId
            },
            data: {
               quantity,
               available: quantity === 0 ? false : true
            }
         });

         //if (quantity > 0) {
         //  const emails = await db.productNotify.findMany({
         //      where: {
         //         cityId,
         //         productId: params?.productId
         //      },
         //      select: {
         //         email: true
         //      }
         //   });

         //   for (let email of emails) {
         //      await sendNotifies(email);
         //   }

         //   //if (emails) await sendNotifies(emails);
            
         //}

         return NextResponse.json({ updateProductCity }, { status: 201 });
      }

      const productCity = await db.productCity.create({
         data: {
            cityId,
            productId: params?.productId,
            quantity
         }
      });

      return NextResponse.json({ productCity }, { status: 201 });

   } catch (err) {
      console.log('[PRODUCTCITY_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {

      const body = await req.json();

      const {
         cityId
      } = body;

      if (!cityId) return NextResponse.json({ message: "CityId is requied" }, { status: 400 });
      if (!params?.productId) return NextResponse.json({ message: "ProductId is requied" }, { status: 400 });

      await db.productCity.deleteMany({
         where: {
            productId: params?.productId,
            cityId
         }
      });

      return NextResponse.json({ message: "ProductCity has been removed!" }, { status: 201 });

   } catch (err) {
      console.log('[PRODUCTCITY_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

