import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { hash } from "@node-rs/argon2"

const prisma = new PrismaClient()

const generateRandomBytes = (length: number) => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const bytesLength = length ?? 10;
  const generateId = customAlphabet(alphabet, bytesLength);
  const result = generateId();
  return result;
};

const users = [
  {
    email: "bruno_fernandez@mail.com",
    username: "bruno_fernandez",
    imageURL: "https://img.a.transfermarkt.technology/portrait/big/240306-1683882766.jpg?lm=1",
    password: "gloryUnited99!"
  },
  {
    email: "matheus_cunha@mail.com",
    username: "matheus_cunha",
    imageURL: "https://lingkaran.id/images/post/manchester-united-serius-incar-matheus-cunha-transfer-ps625-juta-kian-dekat-amorim-mulai-susun-puzzle-musim-baru.jpg",
    password: "gloryUnited99!"
  },
  {
    email: "amad_dialo@mail.com",
    username: "amad_dialo",
    imageURL: "https://www.footballdatabase.eu/images/photos/players/a_395/395052.jpg",
    password: "gloryUnited99!"
  },
  {
    email: "dorgu@mail.com",
    username: "patrick_dorgu",
    imageURL: "https://image-service.onefootball.com/transform?w=280&h=210&dpr=2&image=https%3A%2F%2Fcdns.klimg.com%2Fbola.net%2Flibrary%2Fupload%2F21%2F2025%2F02%2Fpatrick-dorgu-mufc-x_6639608.jpg",
    password: "gloryUnited99!"
  },
  {
    email: "mbeumo@mail.com",
    username: "b.mbeumo",
    imageURL: "https://s.hs-data.com/bilder/spieler/gross/414559.jpg",
    password: "gloryUnited99!"
  },
  {
    email: "joshua_zirkzee@mail.com",
    username: "joshua_zirkzee",
    imageURL: "https://img.uefa.com/imgml/TP/players/14/2025/324x324/250106762.jpg",
    password: "gloryUnited99!"
  },
]

async function main() {
  const newData = await Promise.all(users.map(async (user) => ({
    ...user,
    password: await hash(user.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })
  })))

  await prisma.user.createMany({
    data: newData.map(({ email, imageURL, password, username }) => ({
      email,
      jwtVersion: generateRandomBytes(10),
      username,
      imageURL,
      password,
    }))
  })
}

main()
  .then(() => {
    console.log('Seed successful');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


