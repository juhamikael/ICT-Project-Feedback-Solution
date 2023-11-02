import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { products, categories, subcategories, productIdSchema } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { Quattrocento } from "next/font/google";
import { NextResponse, NextRequest } from "next/server";

type Order = {
    id: number;
    userId: number | null;
    status: string;
    totalPrice: number;
}

export async function GET() {
    const result: Order[] = await db.select().from(orders);
    console.log(result);
    return NextResponse.json({
        status: 200,
        body: {
            orders: result,
        }
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const product = db.select().from(products).where(eq(products.id, body.id)).get();
    
    if (!product) {
        return NextResponse.json({
            status: 400,
            body: "Product not found"
        });
    }

    const quantityAfterOrder = product.quantity - body.quantity;

    if (product.quantity === 0) {
        return NextResponse.json({
            status: 400,
            body: "Product not in stock"
        });
    }

    if (quantityAfterOrder < 0) {
        return NextResponse.json({
            status: 400,
            body: "Not enough products in stock"
        })
    }


    db.insert(products).values(body).run();

    return NextResponse.json({
        status: 200,
        body: body
    });
}