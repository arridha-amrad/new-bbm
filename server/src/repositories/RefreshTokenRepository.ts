import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class RefreshTokenRepository {
  async deleteOne(token: string) {
    await prisma.refreshToken.delete({
      where: {
        token,
      },
    });
  }

  async createOne(data: Prisma.RefreshTokenCreateInput) {
    const result = await prisma.refreshToken.create({
      data,
    });
    return result;
  }

  async findOne(where: Prisma.RefreshTokenWhereUniqueInput) {
    const result = await prisma.refreshToken.findUnique({
      where
    })
    return result
  }
}
