
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const products = sqliteTable("products", {
    id: text("id").primaryKey(),
    imageId: text("imageId").notNull(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    description: text("description"),
    quantity: integer("quantity").notNull(),
    categoryId: integer("categoryId").references(() => categories.id, { onDelete: "cascade" }),
    subcategoryId: integer("subcategoryId").references(() => subcategories.id, { onDelete: "cascade" }),
});

export const categories = sqliteTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
});

export const subcategories = sqliteTable("subcategories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    categoryId: text("categoryId").references(() => categories.id, { onDelete: "cascade" }),
});


export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const productIdSchema = selectProductSchema.pick({ id: true });
export const updateProductSchema = selectProductSchema;

export type Product = z.infer<typeof selectProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type ProductId = z.infer<typeof productIdSchema>['id'];

export const insertCategorySchema = createInsertSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);
export const categoryIdSchema = selectCategorySchema.pick({ id: true });

export type Category = z.infer<typeof selectCategorySchema>;
export type NewCategory = z.infer<typeof insertCategorySchema>;

export const insertSubcategorySchema = createInsertSchema(subcategories);
export const selectSubcategorySchema = createSelectSchema(subcategories);
export const subcategoryIdSchema = selectSubcategorySchema.pick({ id: true });

export type Subcategory = z.infer<typeof selectSubcategorySchema>;
export type NewSubcategory = z.infer<typeof insertSubcategorySchema>;
