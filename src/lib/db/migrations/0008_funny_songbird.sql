CREATE TABLE IF NOT EXISTS "test-table" (
	"id" text PRIMARY KEY NOT NULL,
	"grade" integer,
	"feedback" text,
	"userId" text,
	"orderId" text,
	"orderDate" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test-table" ADD CONSTRAINT "test-table_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "test-table" ADD CONSTRAINT "test-table_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
