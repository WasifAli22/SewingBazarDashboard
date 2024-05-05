CREATE TABLE IF NOT EXISTS "inquiry" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"product_name" varchar(256),
	"product_id" varchar(50),
	"inquiry_text" text,
	"created_at" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "inquiry_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "login_users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "login_users_email_unique" UNIQUE("email")
);
