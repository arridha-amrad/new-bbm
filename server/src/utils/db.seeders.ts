import { hash } from 'argon2';

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const word =
  'helloworldimariljdsjdhfjskdhfjksdhfjshkjfshjkhfjkhsjkdfhsjkdfhjksdhfsfkjsfhsjk'.split(
    ''
  );

async function main(): Promise<void> {
  const password = await hash('ariOk123');
  await prisma.user.createMany({
    data: word.map(() => ({
      email: faker.internet.email(),
      password,
      username: faker.internet.userName().toLowerCase().replace(/\./g, '_'),
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
