import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { username, imageURL } = req.body;
  const userId = req.user?.id;

  const userService = new UserService()

  try {
    if (!userId) {
      res.sendStatus(401)
      return
    }

    const updatedUser = await userService.updateUser(userId, { username, imageURL })

    res.status(200).json({
      user: userService.setUserResponse(updatedUser)
    });
    return

  } catch (err) {
    next(err);
  }
};
