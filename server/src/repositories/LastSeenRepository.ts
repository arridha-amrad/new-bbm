import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class LastSeenRepository {
  async findOne(where: Prisma.LastSeenWhereUniqueInput) {
    const result = await prisma.lastSeen.findUnique({
      where
    })
    return result
  }

  async createOne(data: Prisma.LastSeenCreateInput) {
    const result = await prisma.lastSeen.create({
      data
    })
    return result
  }

  async updateOne(where: Prisma.LastSeenWhereUniqueInput, data: Prisma.LastSeenUpdateInput) {
    const result = await prisma.lastSeen.update({
      where,
      data
    })
    return result
  }
}