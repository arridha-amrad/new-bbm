import { NextFunction, Request, Response } from 'express';
import sanitizeHtml from "sanitize-html";
import { z } from 'zod';
import { formatZodErrors } from './helper.validator';

export const schema = z.object({
  username: z.string()
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    ),
  imageUrl: z.string()
    .transform((val) =>
      sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} })
    ),
});

export type UpdateUserInput = z.infer<typeof schema>;

export const validateUpdateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = schema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: formatZodErrors(validation.error) });
    return;
  }
  req.body = validation.data;
  next();
};


