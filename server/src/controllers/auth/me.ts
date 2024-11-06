import { findUserById } from "@/services/user";
import { CustomError } from "@/utils/CustomError";
import { NextFunction, Request, Response } from "express";

const me = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.app.locals.userId;
  if (typeof userId !== "string") {
    throw new CustomError("invalid userId", 500);
  }
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    // eslint-disable-next-line
    const { password, ...props } = user;
    res.status(200).json({ user: props });
  } catch (err) {
    next(err);
  }
};

export default me;
