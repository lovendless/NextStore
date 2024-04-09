
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

   try {

      let fav = req.cookies.get('fav')?.value;

      if (!fav) {
         return NextResponse.json({ fav: [] }, { status: 200 });
      }

      let favArray = fav?.split(',');

      return NextResponse.json({ fav: favArray }, { status: 200 });

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

