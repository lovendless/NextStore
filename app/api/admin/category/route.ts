import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(
   req: NextRequest
) {

   try {

      const body = await req.json();

      const { name, billboardId } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });
      if (!billboardId) return NextResponse.json({ message: "billboardId is requied" }, { status: 400 });

      const existingCategoryByName = await db.category.findFirst({
         where: {
            name
         }
      })

      if (existingCategoryByName) {
         return NextResponse.json({ city: null, message: "Category with this name already exists" }, { status: 409 })
      }

      const category = await db.category.create({
         data: {
            name,
            billboardId
         }
      });

      return NextResponse.json({ category }, { status: 201 });


   } catch (err) {
      console.log('[CATEGORY_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

