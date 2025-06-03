import { prisma } from "@/lib/prisma";

type TCreate = {
  content: string;
  chatId: number;
  userId: number;
  sentAt: Date;
};

type TReaction = {
  id: number;
  value: string;
  unified: string;
  users: [
    {
      id: number;
      username: string;
      imageURL: string | null;
    }
  ];
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
        user: {
          select: {
            id: true,
            username: true,
            imageURL: true,
          },
        },
        reactions: {
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
      const reactions = data.reactions.reduce((prev, curr) => {
        const reaction = prev.find((v) => v.unified === curr.unified);
        if (!reaction) {
          prev.push({
            ...curr,
            users: [curr.user],
          });
        } else {
          reaction.users.push(curr.user);
        }
        return prev;
      }, [] as TReaction[]);
      return {
        id: data.id,
        chatId: data.chatId,
        content: data.content,
        sentAt: data.sentAt,
        user: {
          id: data.user.id,
          username: data.user.username,
          imageURL: data.user.imageURL,
        },
        readers: data.readers.map((r) => ({
          ...r.reader,
        })),
        reactions,
      };
    });
    return messages;
  }

  async deleteOne(id: number) {
    await prisma.message.delete({ where: { id } });
  }
}
