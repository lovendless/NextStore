import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

   try {
      const nextCookies = cookies();

      const body = await req.json();
      
      const { cityId } = body;

      if (!cityId) {
         return NextResponse.json({ message: "Current city is required!" }, { status: 400 })
      }

      const chosenCity = await db.city.findUnique({
         where: {
            id: cityId
         },
         include: {
            availableProducts: {
               include: {
                  product: true
               }
            }
         }
      })

      if (!chosenCity) {
         return NextResponse.json({ message: "Current city is not exist" }, { status: 400 })
      }

      nextCookies.set('city', cityId)

      return NextResponse.json(chosenCity, { status: 200 });

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}