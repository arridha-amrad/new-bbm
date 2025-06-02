import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z.string().min(1),
  receiverIds: z.number().array(),
  chatId: z.number().nullable(),
  sentAt: z.string()
});
export type TSendMessage = z.infer<typeof sendMessageSchema>;
