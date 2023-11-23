import { db } from "@/lib/db";
import { products, categories, subcategories } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";
export type Product = {
    id: string;
    imageId: string;
    name: string;
    price: number;
    description: string | null;
    quantity: number | null;
    categoryId: string | null;
    subcategoryId: string | null;
}

export async function GET() {
    const result: Product[] = await db.select().from(products);
    return NextResponse.json({
        status: 200,
        body: {
            products: result,
        }
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const category = await db.select().from(categories).where(eq(categories.id, body.categoryId))
    const subcategory = await db.select().from(subcategories).where(eq(subcategories.id, body.subcategoryId))
    const productId = v4();

    if (!category || category.length === 0) {
        console.log("Category not found")
        return NextResponse.json({
            status: 400,
            body: "Category not found"
        });
    }
    if (!subcategory || subcategory.length === 0) {
        console.log("Subcategory not found")
        return NextResponse.json({
            status: 400,
            body: "Subcategory not found"
        });
    }

    const product = {
        ...body,
        id: productId,
    };

    await db.insert(products).values(product);

    return NextResponse.json({
        status: 200,
        body: body
    });
}