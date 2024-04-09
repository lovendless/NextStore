import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function PATCH(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {

      const body = await req.json();

      const {
         name,
         price,
         description,
         categoryId,
         images,
         isArchived,
      } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });
      if (!price) return NextResponse.json({ message: "Price is requied" }, { status: 400 });
      if (!description) return NextResponse.json({ message: "Description is requied" }, { status: 400 });
      if (!categoryId) return NextResponse.json({ message: "Category is requied" }, { status: 400 });

      if (!params.productId) return NextResponse.json({ message: "ProductId is requied" }, { status: 400 });

      const updateProduct = await db.product.update({
         where: {
            id: params.productId
         },
         data: {
            name: name.toLowerCase(),
            price,
            description,
            categoryId,
            isArchived,
            images: {
               deleteMany: {}
            }
         }
      })

      const updateProductWithImages = await db.product.update({
         where: {
            id: params.productId
         },
         data: {
            images: {
               createMany: {
                  data: [
                     ...images.map((image: {url: string}) => image)
                  ]
               }
            }
         }
      })

      if (!updateProduct) {
         return NextResponse.json({ product: null, message: "Product has not been updated" }, { status: 400 })
      }

      return NextResponse.json({ product: updateProductWithImages, message: "Product has been updated successfully" }, { status: 201 })


   } catch (err) {
      console.log('[PRODUCT_PATCH]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { productId: string } }
) {

   try {

      if (!params.productId) return NextResponse.json({ message: "ProductId is requied" }, { status: 400 });

      await db.product.delete({
         where: {
            id: params.productId
         },
      })

      return NextResponse.json({ message: "Product has been removed successfully" }, { status: 201 })

   } catch (err) {
      console.log('[PRODUCT_DELETE]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}


