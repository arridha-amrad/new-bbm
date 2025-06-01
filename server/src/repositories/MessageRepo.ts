import { prisma } from "@/lib/prisma";

type TCreate = {
  content: string;
  chatId: number;
  userId: number;
  sentAt: Date;
};

export default class MessageRepo {
  async createOne({ chatId, content, sentAt, userId }: TCreate) {
    const result = await prisma.message.create({
      data: {
        content,
        chatId,
        userId,
        sentAt,
      },
    });
    return result;
  }

  async findMany(chatId: number) {
    const result = await prisma.message.findMany({
      where: {
        chatId,
      },
    });
    return result;
  }

  async deleteOne(id: number) {
    await prisma.message.delete({ where: { id } });
  }
}
