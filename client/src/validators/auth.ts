import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  imageURL: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
});
export type TRegister = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identity: z.string().min(1, { message: "This field is required" }),
  password: z.string().min(1, { message: "This field is required" }),
});
export type TLogin = z.infer<typeof loginSchema>;
