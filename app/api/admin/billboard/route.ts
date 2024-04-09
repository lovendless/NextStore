import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(
   req: NextRequest
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

      const existingBillboardByName = await db.billboard.findFirst({
         where: {
            label
         }
      })

      if (existingBillboardByName) {
         return NextResponse.json({ message: "Billboard with this name already exists" }, { status: 409 })
      }

      const billboard = await db.billboard.create({
         data: {
            label,
            imageUrl,
            isFeatured
         }
      });

      return NextResponse.json({ billboard }, { status: 201 });

   } catch (err) {
      console.log('[BILLBOARD_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

