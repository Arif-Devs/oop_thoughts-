import { faker } from '@faker-js/faker';
import db from '../connect';
import {
	BookGenreTable,
	BookStatus,
	BookTable,

	PublisherTable,
} from '../schemas/book';
import { NewUser, UserRole, UserStatus, UserTable } from '../schemas/user';


async function seed() {
	// Clear existing data
	await db.delete(BookTable);
	await db.delete(BookGenreTable);
	await db.delete(PublisherTable);
	await db.delete(UserTable);
	

	// Create users
	const users: NewUser[] = [];
	for (let i = 0; i < 20; i++) {
		users.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: 'password123',
			role: i === 0 ? 'admin' : 'user',
			status: faker.helpers.arrayElement(['active', 'inactive']),
		});
	}
	const createdUsers = await db.insert(UserTable).values(users).returning();

	// Create categories
	
	// Create publishers
	const publishers = Array.from({ length: 8 }, () => ({
		name: faker.company.name(),
		description: faker.company.catchPhrase(),
	}));
	const createdPublishers = await db
		.insert(PublisherTable)
		.values(publishers)
		.returning();

	// Create book genres
	const genres = Array.from({ length: 10 }, () => ({
		name: faker.word.sample(),
		description: faker.lorem.sentence(),
	}));
	const createdGenres = await db
		.insert(BookGenreTable)
		.values(genres)
		.returning();

	// Create books
	
	console.log('Seed completed successfully');
}

seed().catch((error) => {
	console.error('Seed failed:', error);
	process.exit(1);
});