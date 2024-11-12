import { z } from "zod";

export const editProfileSchema = z.object({
  username: z.string().min(5),
  imageURL: z.string().nullable(),
});

export type TEditProfile = z.infer<typeof editProfileSchema>;
