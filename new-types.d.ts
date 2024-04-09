import { ProductImage, Product, Category, Billboard } from "@prisma/client"

export type City = {
   id: string,
   name: string,
   default: Boolean,
   createdAt: Date,
   updatedAt: Date,
   availableProducts: ProductCity[]
}

export type Billboard = {
   id: string,
   label: string,
   imageUrl: string,
   isFeatured: Boolean,
   createdAt: Date,
   updatedAt: Date,
}

export type Category = {
   id: string,
   name: string,
   billboard: Billboard
   createdAt: Date,
   updatedAt: Date,
   products: Product[]
}


export type Product = {
   id: string,
   name: string,
   description: string,
   price: Decimal,
   category: Category,
   images: ProductImage[],
   createdAt: Date,
   updatedAt: Date,
   availableCities: ProductCity[],
}

export type Image = {
   id: string,
   url: string,
   createdAt: Date,
   updatedAt: Date,
   productId: string,
}

export type ProductCity = {
   cityId: string,
   productId: string,
   available: Boolean,
   quantity: Number,
   addedAt: Date,
   updatedAt: Date
}
