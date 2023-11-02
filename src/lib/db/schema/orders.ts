import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import {users} from './users'
import { products } from './product';

export const orders = sqliteTable("orders", {

    id: integer("id").primaryKey(),
    userId: integer("userId").references(() => users.id, {onDelete: "cascade"}),
    status: text("status").notNull(),
    totalPrice: real("totalPrice").notNull()
});

export const orderDetails = sqliteTable("orderDetails", {

    id: integer("id").primaryKey(),
    orderId: integer("orderId").references(() => orders.id, {onDelete: "cascade"}),
    productId: integer("productId").references(() => products.id, {onDelete: "cascade"}),
    quantity: integer("quantity").notNull()
});

export const feedback = sqliteTable("feedback", {

    id: integer("id").primaryKey(),
    orderId: integer("orderId").references(() => orders.id, {onDelete: "cascade"}),
    rating: integer("rating").notNull(),
    comment: text("comment")
});

