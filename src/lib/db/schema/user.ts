import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const adminLogin = pgTable('adminLogin', {
  user_id: serial('user_id').primaryKey(),
  email:varchar("email",{length:256}).notNull().unique(),
  password:varchar("password",{length:256}).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

