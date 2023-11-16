import { db } from "@/lib/db";
import { subcategories } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

type TSubCategory = {
    id: string;
    name: string;
    categoryId: string | null;
}

export async function GET() {
    const result: TSubCategory[] = await db.select().from(subcategories);
    return NextResponse.json({
        status: 200,
        body: result,
    });
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const category = db.select().from(subcategories).where(eq(subcategories.id, body.id)).get();

    if (category) {
        return NextResponse.json({
            status: 400,
            body: "Category with this id already exists"
        });
    }

    db.insert(subcategories).values(body).run();

    return NextResponse.json({
        status: 200,
        body: body
    });
}