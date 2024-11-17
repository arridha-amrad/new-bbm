import { Response, Request } from "express";

export const setMessageRead = async (req: Request, res: Response) => {
  const { ids, chatId } = req.body;
  const readerId = req.app.locals.userId;
};
