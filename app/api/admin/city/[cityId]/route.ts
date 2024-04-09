import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

//Define a schema for input validation
export async function PATCH(
   req: NextRequest,
   { params }: { params: { cityId: string } }
) {

   try {

      const body = await req.json();

      const { name, defaultCity } = body;

      if (!name) return NextResponse.json({ message: "Name is requied" }, { status: 400 });

      if (!params.cityId) return NextResponse.json({ message: "CityId is requied" }, { status: 400 });

      const updateCity = await db.city.update({
         where: {
            id: params.cityId
         },
         data: {
            name: name,
            default: defaultCity
         }
      })

      if (!updateCity) {
         return NextResponse.json({ city: null, message: "City has not been updated" }, { status: 400 })
      }

      return NextResponse.json({ city: updateCity, message: "City has been updated successfully" }, { status: 201 })


   } catch (err) {
      console.log('[CITY_PATCH]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { cityId: string } }
) {

   try {

      if (!params.cityId) return NextResponse.json({ message: "CityId is requied" }, { status: 400 });

      await db.city.delete({
         where: {
            id: params.cityId
         },
      })

      return NextResponse.json({ message: "City has been removed successfully" }, { status: 201 })

   } catch (err) {
      console.log('[CITY_DELETE]', err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}


