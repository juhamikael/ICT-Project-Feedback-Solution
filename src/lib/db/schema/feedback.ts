import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from './users';
import { orders } from './orders';

export const feedBack = pgTable("feedback", {
    id: text("id").primaryKey(),
    grade: integer("grade"),
    feedback: text("feedback"),
    userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
    orderId: text("orderId").references(() => orders.id, { onDelete: "cascade" }),
    createdAt: timestamp("orderDate").notNull()
});


