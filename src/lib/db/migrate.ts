import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from 'dotenv';
config({ path: '.env.local' });

const connectionString = process.env.DB_HOST!;

const runMigrate = async () => {
    if (!process.env.DB_HOST) {
        throw new Error("DATABASE_URL is not defined");
    }

    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);
    console.log("⏳ Running migrations...");
    const start = Date.now();
    await migrate(db, { migrationsFolder: "src/lib/db/migrations" });
    const end = Date.now();
    console.log("✅ Migrations completed in", end - start, "ms");
    process.exit(0);
};

runMigrate().catch((err) => {
    console.error("❌ Migration failed");
    console.error(err);
    process.exit(1);
});