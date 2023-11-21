CREATE TABLE IF NOT EXISTS "orderDetails" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text,
	"productId" text,
	"quantity" integer NOT NULL,
	"orderDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"status" text NOT NULL,
	"totalPrice" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"imageId" text NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"categoryId" text,
	"subcategoryId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subcategories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"categoryId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	"last_login" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_subcategoryId_subcategories_id_fk" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
