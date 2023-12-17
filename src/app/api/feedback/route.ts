import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { products } from "@/lib/db/schema/product";
import { feedBack } from "@/lib/db/schema/feedback";
import { users } from "@/lib/db/schema/users";
import { eq, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const feedbackEntries = await db.select()
        .from(feedBack)
        .leftJoin(orders, eq(feedBack.orderId, orders.id))
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .leftJoin(products, eq(orderDetails.productId, products.id))
        .leftJoin(users, eq(orders.userId, users.id))

    return NextResponse.json({
        status: 200,
        body: feedbackEntries
    })
}
