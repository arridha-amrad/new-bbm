import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const initDb = async () => {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'messenger',
		port: 3306,
	});
	const db = drizzle(connection, { schema, mode: 'default' });
	return db;
};

async function main() {
	try {
		const db = await initDb();
		await migrate(db, {
			migrationsFolder: 'src/lib/drizzle/migrations',
		});
		console.log('migration successful 🔥');
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

main();
