import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/drizzle/schema.ts',
	out: './src/lib/drizzle/migrations',
	dialect: 'mysql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	strict: true,
	verbose: true,
} satisfies Config;
