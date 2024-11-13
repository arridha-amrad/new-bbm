CREATE TABLE `last_seen` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`last_seen_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `online_status`;