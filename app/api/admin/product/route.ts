import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(
   req: NextRequest
) {

   try {

      const body = await req.json();

      const {
         name,
         price,
         description,
         categoryId,
         images,
         isArchived
      } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });
      if (!price) return NextResponse.json({ message: "Price is requied" }, { status: 400 });
      if (!description) return NextResponse.json({ message: "Description is requied" }, { status: 400 });
      if (!categoryId) return NextResponse.json({ message: "Category is requied" }, { status: 400 });

      const existingProductByName = await db.product.findFirst({
         where: {
            name
         }
      })

      if (existingProductByName) {
         return NextResponse.json({ message: "Product with this name already exists" }, { status: 409 })
      }

      const product = await db.product.create({
         data: {
            name: name.toLowerCase(),
            description,
            price,
            categoryId,
            isArchived,
            images: {
               createMany: {
                  data: [
                     ...images.map((image: { url: string }) => image)
                  ]
               }
            }
         }
      });

      return NextResponse.json({ product }, { status: 201 });

   } catch (err) {
      console.log('[PRODUCT_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

