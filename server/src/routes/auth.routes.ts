import login from "@/controllers/auth/login";
import logout from "@/controllers/auth/logout";
import me from "@/controllers/auth/me";
import refreshToken from "@/controllers/auth/refreshToken";
import register from "@/controllers/auth/register";
import { verifyAuthToken } from "@/lib/jwt";
import { validateSignupInput } from "@/middleware/validator/signup";
import { Router } from "express";

const router = Router();

router.get("/", verifyAuthToken, me);
router.post("/", login);
router.post("/register", validateSignupInput, register);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);

export default router;
