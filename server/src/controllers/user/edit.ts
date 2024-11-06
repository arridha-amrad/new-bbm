import { updateUser } from "@/services/user";
import { NextFunction, Request, Response } from "express";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, imageURL } = req.body;
    const { userId } = req.app.locals;

    const { username: u, imageURL: i } = await updateUser(
      userId,
      username,
      imageURL
    );
    res.status(200).json({
      username: u,
      imageURL: i,
    });
  } catch (err) {
    next(err);
  }
};
