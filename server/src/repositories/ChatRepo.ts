import { prisma } from "@/lib/prisma";

export default class ChatRepo {
  async create(name?: string) {
    const result = await prisma.chat.create({
      data: {
        name,
      },
    });
    return result;
  }

  async deleteOne(id: number) {
    await prisma.chat.delete({
      where: {
        id,
      },
    });
  }

  async findChats(userId: number) {
    const result = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            sentAt: "desc",
          },
          select: {
            content: true,
            sentAt: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                imageURL: true,
              },
            },
          },
        },
      },
    });
    return result.map((chat) => ({
      id: chat.id,
      name: chat.name,
      participants: chat.participants.map((p) => p.user),
      message: {
        content: chat.messages[0].content,
        date: chat.messages[0].sentAt,
      },
    }));
  }
}
