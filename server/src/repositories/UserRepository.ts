import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class UserRepository {
  async findOne(where: Prisma.UserWhereUniqueInput) {
    const result = await prisma.user.findUnique({
      where,
    });
    return result;
  }

  async createOne(data: Prisma.UserCreateInput) {
    const result = await prisma.user.create({
      data,
    });
    return result;
  }

  async updateOne(
    id: number,
    { imageURL, username }: { username?: string; imageURL?: string }
  ) {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        imageURL,
      },
    });
    return result;
  }

  async findMany(key: string) {
    const users = await prisma.user.findMany({
      take: 10,
      where: {
        username: {
          contains: key,
        },
      },
    });
    return users;
  }
}
