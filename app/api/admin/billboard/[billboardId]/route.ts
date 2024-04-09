import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function PATCH(
   req: NextRequest,
   { params }: { params: { billboardId: string } }
) {

   try {

      const body = await req.json();

      const {
         label,
         imageUrl,
         isFeatured,
      } = body;

      if (!label) return NextResponse.json({ message: "Label is requied" }, { status: 400 });
      if (!imageUrl) return NextResponse.json({ message: "ImageUrl is requied" }, { status: 400 });

      if (!params.billboardId) return NextResponse.json({ message: "billboardId is requied" }, { status: 400 });

      const updateBillboard = await db.billboard.update({
         where: {
            id: params.billboardId
         },
         data: {
            label,
            imageUrl,
            isFeatured,
         }
      })

      if (!updateBillboard) {
         return NextResponse.json({ billboard: null, message: "Billboard has not been updated" }, { status: 400 })
      }

      return NextResponse.json({ billboard: updateBillboard, message: "Billboard has been updated successfully" }, { status: 201 })


   } catch (err) {
      console.log('[BILLBOARD_PATCH]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { categoryId: string } }
) {

   try {

      if (!params.categoryId) return NextResponse.json({ message: "CategoryId is requied" }, { status: 400 });

      await db.category.delete({
         where: {
            id: params.categoryId
         },
      })

      return NextResponse.json({ message: "Category has been removed successfully" }, { status: 201 })

   } catch (err) {
      console.log('[CATEGORY_DELETE]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}


