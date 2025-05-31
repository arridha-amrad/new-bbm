import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class UserRepository {
  async findOne(filter: Prisma.UserWhereUniqueInput) {
    const result = await prisma.user.findUnique({
      where: filter,
    });
    return result;
  }

  async createOne(data: Prisma.UserCreateInput) {
    const result = await prisma.user.create({
      data,
    });
    return result;
  }
}
