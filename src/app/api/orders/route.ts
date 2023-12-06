import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { users } from "@/lib/db/schema/users";
import { products } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";


export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({
            status: 400,
            body: "User id is required"
        });
    }

    // Fetch all orders for the user with details and product images in a single query
    const allOrders = await db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .leftJoin(products, eq(orderDetails.productId, products.id))
        .where(eq(orders.userId, userId)).execute();

    // console.log(allOrders)


    return NextResponse.json({
        status: 200,
        body: allOrders
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const product = await db.select().from(products).where(eq(products.id, body.productId))
    const user = await db.select().from(users).where(eq(users.id, body.userId))
    const orderId = v4();

    // console.log(body)
    if (!product) {
        return NextResponse.json({
            status: 400,
            body: "Product not found"
        });
    }

    const quantityAfterOrder = product[0].quantity - body.quantity;

    if (product[0].quantity === 0) {
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

    if (!user) {
        return NextResponse.json({
            status: 400,
            body: "User not found"
        });
    }

    await db.update(products)
        .set({ quantity: quantityAfterOrder })
        .where(eq(products.id, body.productId));


    await db.insert(orders).values({
        id: orderId,
        userId: body.userId,
        orderDate: new Date(),
        totalPrice: product[0].price * body.quantity,
        status: "pending"
    }).execute();

    await db.insert(orderDetails).values({
        id: v4(),
        orderId: orderId,
        productId: body.productId,
        quantity: body.quantity,
    }).execute();

    return NextResponse.json({
        status: 200,
        body: product
    });
}