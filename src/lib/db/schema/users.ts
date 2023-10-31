import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email"),
});


export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const userIdSchema = selectUserSchema.pick({ id: true });
export const updateUserSchema = selectUserSchema;

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type UserId = z.infer<typeof userIdSchema>['id'];
