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

    const dbUser = await db.select().from(users).where(eq(users.id, user.id));

    if (!dbUser || dbUser == null || dbUser.length == 0) {
        console.log("inserting user");
        await db.insert(users)
            .values({
                id: user.id,
                firstName: user.given_name,
                lastName: user.given_name,
                email: user.email,
                lastSeen: new Date()
            })
    }
    if (dbUser && dbUser != null && dbUser.length > 0) {
        console.log("updating user");
        await db.update(users)
            .set({
                lastSeen: new Date()
            })
            .where(eq(users.id, user.id));
    }
    return NextResponse.redirect("http://localhost:3000/dashboard");
}