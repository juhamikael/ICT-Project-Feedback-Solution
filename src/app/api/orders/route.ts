import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { users } from "@/lib/db/schema/users";
import { products } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";


export async function GET() {
    const allOrders = await db.select().from(orders)
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .leftJoin(products, eq(orderDetails.productId, products.id))
        .leftJoin(users, eq(orders.userId, users.id))


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
        orderId: orderId,
        productId: body.productId,
        quantity: body.quantity,
    }).execute();

    return NextResponse.json({
        status: 200,
        body: product
    });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const order = await db.select().from(orders).where(eq(orders.id, body.orderId))

    if (!order) {
        return NextResponse.json({
            status: 400,
            body: "Order not found"
        });
    }

    await db.update(orders)
        .set({ status: body.status })
        .where(eq(orders.id, body.orderId));

    return NextResponse.json({
        status: 200,
        body: order
    });
}