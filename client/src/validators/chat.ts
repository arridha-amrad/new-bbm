import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z.string().min(1),
  receiverId: z.string().nanoid(),
  chatId: z.string().nanoid().nullable(),
});
export type TSendMessage = z.infer<typeof sendMessageSchema>;
