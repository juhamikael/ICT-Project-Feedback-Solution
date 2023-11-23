import { NextRequest as Request, NextResponse as Response } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";


export async function GET(request: Request) {
    const id = request.url.split("/").pop();

    if (!id || Array.isArray(id)) {
        return Response.json({
            status: 400,
            body: "Invalid ID",
        });
    }

    const product = await db.select().from(products).where(eq(products.id, id));

    if (!product.length) {
        return new Response(JSON.stringify({
            status: 404,
            body: "Product not found",
        }), { status: 404 });
    }

    return Response.json({
        status: 200,
        body: { product },
    });
}
