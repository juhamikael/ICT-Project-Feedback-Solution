import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { NextResponse } from "next/server";

type Users = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    lastSeen: Date | null;
};

export async function GET() {
    const result: Users[] = await db.select().from(users);
    return NextResponse.json({
        status: 200,
        body: result,
    });
}

