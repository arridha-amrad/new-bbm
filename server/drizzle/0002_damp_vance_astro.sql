CREATE TABLE `message_readers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_id` text NOT NULL,
	`reader_id` text NOT NULL,
	`read_at` text,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reader_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `online_status` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`is_online` integer DEFAULT false NOT NULL,
	`last_seen` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
