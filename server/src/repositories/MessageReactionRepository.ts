import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class MessageReactionRepository {
  async createOne(data: Prisma.MessageReactionCreateInput) {
    const result = await prisma.messageReaction.create({
      data,
    });
    return result;
  }

  async findOne(where: Prisma.MessageReactionWhereUniqueInput) {
    return prisma.messageReaction.findUnique({
      where,
    });
  }

  async deleteOne(where: Prisma.MessageReactionWhereUniqueInput) {
    return prisma.messageReaction.delete({
      where,
    });
  }
}
