CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY NOT NULL,
	`orderId` integer,
	`rating` integer NOT NULL,
	`comment` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orderDetails` (
	`id` integer PRIMARY KEY NOT NULL,
	`orderId` integer,
	`productId` integer,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer,
	`status` text NOT NULL,
	`totalPrice` real NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
