import { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { formatZodErrors } from "./helper.validator";

export const schema = z.object({
  key: z
    .string()
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    ),
});

export type SearchUserInput = z.infer<typeof schema>;

export const validateSearchUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = schema.safeParse(req.query);
  if (!validation.success) {
    res.status(400).json({ errors: formatZodErrors(validation.error) });
    return;
  }
  req.query.key = validation.data.key;
  next();
};
