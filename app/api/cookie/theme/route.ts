
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

   try {

      const data = await req.json();

      const { theme } = data;

      if (!theme) {
         return NextResponse.json(undefined, { status: 200 });
      }

      return NextResponse.json(theme, { status: 200,  headers: { "Set-Cookie": `theme=${theme};path=/;` }});

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}

