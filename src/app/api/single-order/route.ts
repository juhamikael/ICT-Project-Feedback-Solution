import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { feedBack } from "@/lib/db/schema/feedback";
import { products } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const orderId = searchParams.get("orderId");

    if (!orderId) {
        return NextResponse.json({
            status: 400,
            body: "Order not found"
        });
    }

    const order = await db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .leftJoin(products, eq(orderDetails.productId, products.id))
        .leftJoin(feedBack, eq(feedBack.orderId, orders.id))
        .where(eq(orders.id, orderId)).execute();

    return NextResponse.json({
        status: 200,
        body: order
    });
}