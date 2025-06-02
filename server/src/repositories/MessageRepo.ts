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
      include: {
        readers: {
          include: {
            reader: {
              select: {
                id: true,
                username: true,
                imageURL: true,
                email: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
    const messages = result.map((data) => {
      return {
        id: data.id,
        chatId: data.chatId,
        content: data.content,
        sentAt: data.sentAt,
        userId: data.userId,
        readers: data.readers.map((r) => ({
          ...r.reader,
        })),
      };
    });
    return messages;
  }

  async deleteOne(id: number) {
    await prisma.message.delete({ where: { id } });
  }
}
