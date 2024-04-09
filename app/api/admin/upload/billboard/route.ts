import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from 'fs/promises'

export const POST = async (req: Request, res: NextResponse) => {

   try {
      await fs.readdir(path.join(process.cwd(), "public/billboards"));
   } catch (err) {
      await fs.mkdir(path.join(process.cwd(), "public/billboards"));
   }

   const formData = await req.formData();

   const file: any = formData.get("file");

   if (!file) {
      return NextResponse.json({ message: "No file received." }, { status: 400 });
   }

   //if (file.size > 50000){
   //   return NextResponse.json({ error: "File size should not exceed 50 KB." }, { status: 400 });
   //}


   const buffer = Buffer.from(await file.arrayBuffer());

   const filename = Date.now() + file.name.replaceAll(" ", "_");

   try {

      await writeFile(
         path.join(process.cwd(), "public/billboards/" + filename),
         buffer
      );

      return NextResponse.json({ name: filename, message: "Success", status: 201 });

   } catch (err) {

      console.log('[IMAGE_POST]', err);

      return NextResponse.json({ message: "Failed", status: 500 });
   }

};