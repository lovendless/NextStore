import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(
   req: NextRequest
) {

   try {

      const body = await req.json();

      const { name, defaultCity } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });

      const existingCityByName = await db.city.findFirst({
         where: {
            name: name
         }
      })

      if (existingCityByName) {
         return NextResponse.json({ city: null, message: "City with this name already exists" }, { status: 409 })
      }

      const city = await db.city.create({
         data: {
            name: name,
            default: defaultCity
         }
      });

      return NextResponse.json({ city }, { status: 201 });


   } catch (err) {
      console.log('[CITY_POST]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

