ALTER TABLE "orders" ADD COLUMN "orderDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "totalPrice" real NOT NULL;--> statement-breakpoint
ALTER TABLE "orderDetails" DROP COLUMN IF EXISTS "orderDate";--> statement-breakpoint
ALTER TABLE "orderDetails" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "orderDetails" DROP COLUMN IF EXISTS "totalPrice";