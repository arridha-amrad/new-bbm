import ChatRepo from "@/repositories/ChatRepo";
import LastSeenRepository from "@/repositories/LastSeenRepository";
import MessageRepo from "@/repositories/MessageRepo";
import ParticipantRepo from "@/repositories/ParticipantRepo";

export default class ChatService {
  constructor(
    private chatRepo = new ChatRepo(),
    private messageRepo = new MessageRepo,
    private lastSeenRepo = new LastSeenRepository(),
    private participantsRepo = new ParticipantRepo()
  ) { }

  async findLastSeenByUserId(id: number) {
    const lastSeen = await this.lastSeenRepo.findOne({ userId: id })
    return lastSeen
  }

  async saveLastSeen(userId: number, date: Date) {
    const newRecord = await this.lastSeenRepo.createOne(
      {
        user: { connect: { id: userId } },
        lastSeenAt: date
      }
    )
    return newRecord
  }

  async updateLastSeen(id: number, date: Date) {
    const updatedRecord = await this.lastSeenRepo.updateOne({
      id
    }, {
      lastSeenAt: date
    })
    return updatedRecord
  }

  async fetchChatsByUserId(id: number) {
    const chats = await this.chatRepo.findChats(id)
    return chats
  }

  async fetchMessagesByChatId(id: number) {
    const messages = await this.messageRepo.findMany(id)
    return messages
  }

  async initChat({ isGroup, name }: { name?: string, isGroup?: boolean }) {
    const newChat = await this.chatRepo.create({ isGroup, name })
    return newChat
  }

  async addChatParticipants(chatId: number, userIds: number[]) {
    const participants = await this.participantsRepo.create(chatId, userIds)
    return participants
  }

  async saveMessage(chatId: number, content: string, sentAt: Date, userId: number) {
    const newMessage = await this.messageRepo.createOne({
      chatId,
      content,
      sentAt,
      userId
    })
    return newMessage
  }
}