import { db } from "@/lib/db";
import { categories, subcategories } from "@/lib/db/schema/product";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const categoriesData = body.categories;

    for (const categoryData of categoriesData) {
        const categoryResult = await db.insert(categories).values({ name: categoryData.name }).run();
        const categoryId = Number(categoryResult.lastInsertRowid);

        for (const subcategoryData of categoryData.subcategories) {
            await db.insert(subcategories).values({
                name: subcategoryData.name,
                categoryId: categoryId,
            }).run();
        }
    }

    return NextResponse.json({
        status: 200,
        body: { message: 'Categories and subcategories have been added successfully' }
    });
}
