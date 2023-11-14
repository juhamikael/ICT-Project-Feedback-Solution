CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` integer,
	`rating` integer NOT NULL,
	`comment` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orderDetails` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text,
	`productId` integer,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` integer,
	`status` text NOT NULL,
	`totalPrice` real NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
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
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`categoryId` text,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text
);
