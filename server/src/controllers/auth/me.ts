import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";
import { errorMonitor } from "stream";

export default async function getAuthUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = new UserService();
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "UnAuthorized" });
      return;
    }

    const user = await userService.getOneUser({ id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: userService.setUserResponse(user) });
    return;
  } catch (err) {
    next(errorMonitor);
  }
}
