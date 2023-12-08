import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/config";
export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication");

    const dbUser = await db.select().from(users).where(eq(users.id, user.id));

    const userValues = {
        id: user.id,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        lastSeen: new Date(),
    }

    if (!dbUser || dbUser == null || dbUser.length == 0) {
        console.log("inserting user");
        await db.insert(users)
            .values(userValues)
    }

    if (dbUser && dbUser != null && dbUser.length > 0) {
        console.log("updating user");
        await db.update(users)
            .set(userValues)
            .where(eq(users.id, user.id));
    }
    return NextResponse.redirect(`${baseUrl}`);
}


