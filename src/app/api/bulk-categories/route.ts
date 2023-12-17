import { db } from "@/lib/db";
import { categories, subcategories } from "@/lib/db/schema/product";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
    const body = await req.json();

    // Extract categories data from the request body
    const categoriesData = body.categories;

    // Iterate over each category in the received data
    for (const categoryData of categoriesData) {

        // Generate a unique ID for the category
        const categoryId = v4();

        // Insert the new category into the database
        await db.insert(categories).values({ name: categoryData.name, id: categoryId });

        // Iterate over each subcategory within the current category
        for (const subcategoryData of categoryData.subcategories) {
            // Generate a unique ID for the subcategory
            const subcategoryId = v4();

            // Insert the new subcategory into the database, linking it to its parent category
            await db.insert(subcategories).values({
                id: subcategoryId,
                name: subcategoryData.name,
                categoryId: categoryId,
            })
        }
    }

    return NextResponse.json({
        status: 200,
        body: { message: 'Categories and subcategories have been added successfully' }
    });
}