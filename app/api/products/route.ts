import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

   try {

      const { searchParams } = new URL(req.url);
      const take = searchParams.get('take');
      const skip = searchParams.get('skip');
      const productId = searchParams.get('productId');
      const category = searchParams.get('category');
      const q = searchParams.get('q');

      if (!take) return NextResponse.json({ message: 'Take prop is required!' }, { status: 400 });
      if (!skip) return NextResponse.json({ message: 'Skip prop is required!' }, { status: 400 });

      const products = await db.product.findMany({
         take: Number(take),
         skip: Number(skip),
         where: {
            NOT: [
               { id: productId ? productId : undefined },
               { isArchived: true },
            ],
            category: {
               name: category ? category : undefined
            },
            name: {
               startsWith: q ? q : undefined
            }
         },
         include: {
            category: true,
            images: true,
            availableCities: true
         },
         orderBy: {
            createdAt: 'desc'
         },
      });

      return NextResponse.json({ products }, { status: 200 });

   } catch (err) {

      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });

   }
}
