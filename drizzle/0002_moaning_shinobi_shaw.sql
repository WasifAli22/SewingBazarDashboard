DROP TABLE "login_users";--> statement-breakpoint
ALTER TABLE "jwt_users" RENAME TO "adminLogin";--> statement-breakpoint
ALTER TABLE "adminLogin" DROP CONSTRAINT "jwt_users_email_unique";--> statement-breakpoint
ALTER TABLE "adminLogin" ADD CONSTRAINT "adminLogin_email_unique" UNIQUE("email");