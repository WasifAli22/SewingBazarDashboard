import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const inquiry = pgTable('inquiry', {
    user_id: serial('user_id').primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    product_name: varchar("product_name", { length: 256 }),
    product_id: varchar("product_id", { length: 50 }),
    inquiry_text: text("inquiry_text"),
    created_at: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});