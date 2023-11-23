ALTER TABLE "orderDetails" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orderDetails" ADD COLUMN "totalPrice" real NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "totalPrice";