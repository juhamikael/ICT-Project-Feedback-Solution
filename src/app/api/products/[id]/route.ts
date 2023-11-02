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

    const product = db.select().from(products).where(eq(products.id, Number(id))).get();

    if (!product) {
        return Response.json({
            status: 404,
            body: "Product not found",
        });
    }

    return Response.json({
        status: 200,
        body: { product },
    });
}
