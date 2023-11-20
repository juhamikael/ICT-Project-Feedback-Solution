import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { Graduate } from 'next/font/google';
import { z } from 'zod';
import { userIdSchema, users } from './users';
import { orderDetails, orders } from './orders';
import { sql } from "drizzle-orm";

export const feedBack = sqliteTable("feedback", {
    id: text("id").primaryKey(),
    grade: integer("grade"),
    feedback: text("feedback"),
    userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
    orderId: text("orderId").references(() => orders.id, { onDelete: "cascade" }),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});


 
