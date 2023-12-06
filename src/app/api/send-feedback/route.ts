import { db } from "@/lib/db";
import { orderDetails, orders } from "@/lib/db/schema/orders";
import { feedBack } from "@/lib/db/schema/feedback";
import { eq, and} from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { v4 } from "uuid";

export async function GET(req: NextRequest) {
 
    const { searchParams } = req.nextUrl;
    const orderId = searchParams.get("orderId");
    const userId = searchParams.get("userId");
    let feedbackGiven = false;

    if (!orderId) {
        return NextResponse.json({
            status: 400,
            body: "Order not found"
        });
    }

    if (!userId) {
        return NextResponse.json({
            status: 400,
            body: "Order not found"
        });
    }

    console.log("orderId", orderId)
    console.log("userId", userId)

    const feedbackEntry = await db.select() 
    .from(feedBack).where(and(
        eq(feedBack.userId, userId),
        eq(feedBack.orderId, orderId))
    )

    if (feedbackEntry.length > 0 ) {
        feedbackGiven = true
    } 
    return NextResponse.json ({
        status: 200,
        feedbackGiven: feedbackGiven
    })
}


export async function POST(req: NextRequest) {
    const body = await req.json();

    const feedbackId = v4();

    const feedback = {
        id: feedbackId,
        grade: body.grade,
        feedback: body.feedback,
        orderId: body.orderId,
        userId: body.userId,
        createdAt: body.feedbackDate
    }

    await db.insert(feedBack).values(feedback).execute();
 
    return NextResponse.json({
        status: 200,
        body: feedback,
        message: "Feedback gave succesfully"
        
    });
}