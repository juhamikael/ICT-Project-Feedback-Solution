import { pgTable, text, timestamp, integer, real } from "drizzle-orm/pg-core";

import { users } from './users'
import { products } from './product';

export const orders = pgTable("orders", {
    id: text("id").primaryKey(),
    userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
    orderDate: timestamp("orderDate").notNull(),
    status: text("status").notNull(),
    totalPrice: real("totalPrice").notNull(),
});

export const orderDetails = pgTable("orderDetails", {
    orderId: text("orderId").primaryKey().references(() => orders.id, { onDelete: "cascade" }),
    productId: text("productId").references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
});

