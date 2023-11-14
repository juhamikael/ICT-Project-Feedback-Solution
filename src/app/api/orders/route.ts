import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { users } from "@/lib/db/schema/users";
import { products, categories, subcategories, productIdSchema } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

import { v4 } from "uuid";

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
    const product = db.select().from(products).where(eq(products.id, body.productId)).get();
    const user = db.select().from(users).where(eq(users.id, body.userId)).get();
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

    if (!user) {
        return NextResponse.json({
            status: 400,
            body: "User not found"
        });
    }

    const orderId = v4();
    console.log("orderId", orderId)
    db.update(products).set({ quantity: quantityAfterOrder }).where(eq(products.id, body.productId)).run();

    db.insert(orders).values({
        id: orderId,
        userId: body.userId,
        status: "pending",
        totalPrice: product.price * body.quantity
    }).run();

    db.insert(orderDetails).values({
        id: v4(),
        orderId: orderId,
        productId: body.productId,
        quantity: body.quantity
    }).run();


    return NextResponse.json({
        status: 200,
        body: product
    });
}