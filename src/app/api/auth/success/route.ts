import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication");

    const dbUser = await db.select().from(users).where(eq(users.id, user.id)).get();

    if (!dbUser) {
        await db.insert(users)
            .values({
                id: user.id,
                firstName: user.given_name,
                lastName: user.given_name,
                email: user.email
            })
            .run();

    }

    return NextResponse.redirect("http://localhost:3000/dashboard");
}