import AuthService from "@/services/AuthService";
import TokenService, { TokenPayload } from "@/services/TokenService";
import { NextFunction, Request, Response } from "express";
import { errors as JoseErrors } from "jose";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenService = new TokenService();
    const authService = new AuthService();
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Not bearer token format");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No token after split");
    }

    const { id, jwtVersion, jti } = (await tokenService.verifyJwt(
      token
    )) as TokenPayload;

    if (!id || !jwtVersion || !jti) {
      throw new Error("Invalid token payload");
    }

    const hasBlackedList = await authService.hasTokenBlackListed(jti);
    if (hasBlackedList) {
      throw new Error("Token has been blacklisted");
    }

    req.user = {
      id,
      jti,
    };
    next();
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof JoseErrors.JWTExpired) {
      res.status(401).json({ message: "Token expired" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
    return;
  }
};
