import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from 'dotenv';
config({ path: '.env' });

const connectionString = process.env.DB_HOST;
const client = postgres(connectionString!);
export const db = drizzle(client);