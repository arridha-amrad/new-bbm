import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { formatZodErrors } from "./helper.validator";

export const schema = z.object({
  emoji: z.enum(["👍", "❤️", "😃", "😢", "🙏", "👎", "😡"]),
  messageId: z.string().transform((v) => parseInt(v)),
  unified: z.enum([
    "1f44d",
    "2764-fe0f",
    "1f603",
    "1f622",
    "1f64f",
    "1f44e",
    "1f621",
  ]),
});

export const validateMessageReactionInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = schema.safeParse({
    emoji: req.body.emoji,
    messageId: req.params.messageId,
    unified: req.body.unified,
  });
  if (!validation.success) {
    res.status(400).json({ errors: formatZodErrors(validation.error) });
    return;
  }
  req.body = validation.data;
  next();
};
