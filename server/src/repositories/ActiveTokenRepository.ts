import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class ActiveTokenRepository {
  async createOne(data: Prisma.ActiveTokenCreateInput) {
    const result = await prisma.activeToken.create({
      data,
    });
    return result;
  }

  async deleteMany(deviceId: string) {
    await prisma.activeToken.deleteMany({
      where: {
        deviceId,
      },
    });
  }

  async findOne(where: Prisma.ActiveTokenWhereUniqueInput) {
    const result = await prisma.activeToken.findUnique({
      where
    })
    return result
  }


}
