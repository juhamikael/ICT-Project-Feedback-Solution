import { db } from "@/lib/db";
import { categories, subcategories } from "@/lib/db/schema/product";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const categoriesData = body.categories;

    for (const categoryData of categoriesData) {
        const categoryId = v4();
        db.insert(categories).values({ name: categoryData.name, id: categoryId }).run();

        for (const subcategoryData of categoryData.subcategories) {
            const subcategoryId = v4();

            db.insert(subcategories).values({
                id: subcategoryId,
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