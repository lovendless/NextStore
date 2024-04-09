import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function PATCH(
   req: NextRequest,
   { params }: { params: { categoryId: string } }
) {

   try {

      const body = await req.json();

      const { name, billboardId } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });
      if (!billboardId) return NextResponse.json({ message: "billboardId is requied" }, { status: 400 });

      if (!params.categoryId) return NextResponse.json({ message: "CategoryId is requied" }, { status: 400 });

      const updateCategory = await db.category.update({
         where: {
            id: params.categoryId
         },
         data: {
            name,
            billboardId
         }
      })

      if (!updateCategory) {
         return NextResponse.json({ category: null, message: "Category has not been updated" }, { status: 400 })
      }

      return NextResponse.json({ category: updateCategory, message: "Category has been updated successfully" }, { status: 201 })


   } catch (err) {
      console.log('[CATEGORY_PATCH]', err);
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


