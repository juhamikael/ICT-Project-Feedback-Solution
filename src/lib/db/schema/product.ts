
import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: text("id").primaryKey(),
    imageId: text("imageId").notNull(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    description: text("description"),
    quantity: integer("quantity").notNull(),
    categoryId: text("categoryId").references(() => categories.id, { onDelete: "cascade" }),
    subcategoryId: text("subcategoryId").references(() => subcategories.id, { onDelete: "cascade" }),
});

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
});

export const subcategories = pgTable("subcategories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    categoryId: text("categoryId").references(() => categories.id, { onDelete: "cascade" }),
});

