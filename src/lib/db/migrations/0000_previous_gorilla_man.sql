CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`imageId` text NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`description` text,
	`quantity` integer NOT NULL,
	`categoryId` integer,
	`subcategoryId` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subcategories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`categoryId` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text
);
