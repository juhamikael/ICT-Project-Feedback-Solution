import { db } from "@/lib/db";
import { products, categories, subcategories, productIdSchema } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

type Product = {
    id: number;
    imageId: string;
    name: string;
    price: number;
    description: string | null;
    quantity: number;
    categoryId: number | null;
    subcategoryId: number | null;
}

export async function GET() {
    const result: Product[] = await db.select().from(products);
    console.log(result);
    return NextResponse.json({
        status: 200,
        body: {
            products: result,
        }
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const category = db.select().from(categories).where(eq(categories.id, body.categoryId)).get();
    const subcategory = db.select().from(subcategories).where(eq(subcategories.id, body.subcategoryId)).get();
    if (!category) {
        return NextResponse.json({
            status: 400,
            body: "Category not found"
        });
    }
    if (!subcategory) {
        return NextResponse.json({
            status: 400,
            body: "Subcategory not found"
        });
    }

    db.insert(products).values(body).run();

    return NextResponse.json({
        status: 200,
        body: body
    });
}