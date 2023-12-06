import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { feedBack } from "@/lib/db/schema/feedback";
import { users } from "@/lib/db/schema/users";
import { products } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";


export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const orderId = searchParams.get("orderId");
    console.log(orderId)
    // Fetch all orders for the user with details and product images in a single query
    const order = await db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .leftJoin(products, eq(orderDetails.productId, products.id))
        .leftJoin(feedBack, eq(feedBack.orderId, orders.id))
        .where(eq(orders.id, orderId)).execute();

    console.log(order)


    return NextResponse.json({
        status: 200,
        body: order
    });
}