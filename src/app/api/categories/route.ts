import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";


type TCategory = {
    id: string;
    name: string;
}

export async function GET() {
    const result: TCategory[] = await db.select().from(categories);
    return NextResponse.json({
        status: 200,
        body: result,
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const category = db.select().from(categories).where(eq(categories.id, body.categoryId)).get();

    if (category) {
        return NextResponse.json({
            status: 400,
            body: "Category with this id already exists"
        });
    }

    db.insert(categories).values(body).run();

    return NextResponse.json({
        status: 200,
        body: body
    });
}