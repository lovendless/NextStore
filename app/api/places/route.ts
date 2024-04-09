import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function POST(req: NextRequest) {

   try {

      const body = await req.json();
      const { query } = body

      if (!query) return NextResponse.json({ message: "No Query" }, { status: 400 });

      const searchedPlaces = await db.city.findMany({
         where: {
            name: {
               startsWith: query
            },
         }
      })

      if (!searchedPlaces) {
         return NextResponse.json({ "message": "Cities not found" }, { status: 400 });
      }

      return NextResponse.json({ searchedPlaces }, { status: 201 });


   } catch (err) {

      console.log('[PLACES_POST]', err);

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

