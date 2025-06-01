import login from "@/controllers/auth/login";
import logout from "@/controllers/auth/logout";
import me from "@/controllers/auth/me";
import refreshToken from "@/controllers/auth/refreshToken";
import signup from "@/controllers/auth/signup";
import { protectedRoute } from "@/middleware/protectedRoute";
import { validateLoginInput } from "@/middleware/validator/login.validator";
import { validateSignupInput } from "@/middleware/validator/signup.validator";
import { Router } from "express";

const router = Router();

router.get("/", protectedRoute, me);
router.post("/", validateLoginInput, login);
router.post("/register", validateSignupInput, signup);
router.post("/logout", protectedRoute, logout);
router.post("/refresh-token", refreshToken);

export default router;
