import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from 'fs/promises'

export const POST = async (req: Request, res: NextResponse) => {

   try {
      await fs.readdir(path.join(process.cwd(), "public/products"));
   } catch (err) {
      await fs.mkdir(path.join(process.cwd(), "public/products"));
   }

   const formData = await req.formData();

   const files: any = formData.getAll("file");

   if (!files) {
      return NextResponse.json({ message: "No file received." }, { status: 400 });
   }

   if (files.length > 3){
      return NextResponse.json({ message: "Files length should not exceed 3." }, { status: 400 });
   }

   //if (file.size > 50000){
   //   return NextResponse.json({ error: "File size should not exceed 50 KB." }, { status: 400 });
   //}

   let filenames: string[] = [];

   for (let file of files) {

      const buffer = Buffer.from(await file.arrayBuffer());

      const filename = Date.now() + file.name.replaceAll(" ", "_");

      try {

         await writeFile(
            path.join(process.cwd(), "public/products/" + filename),
            buffer
         );

         filenames.push(filename);

      } catch (err) {

         console.log('[IMAGE_POST]', err);

         return NextResponse.json({ message: "Failed", status: 500 });
      }
   }

   return NextResponse.json({ names: filenames, status: 201 });

};