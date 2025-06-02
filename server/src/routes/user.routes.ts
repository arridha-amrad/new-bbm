import { edit } from "@/controllers/user/edit";
import search from "@/controllers/user/searchUser.controller";
import { protectedRoute } from "@/middleware/protectedRoute";
import { validateSearchUserInput } from "@/middleware/validator/searchUser.validator";
import { validateUpdateUserInput } from "@/middleware/validator/updateUser.validator";
import { Router } from "express";

const router = Router();

router.put("/", validateUpdateUserInput, protectedRoute, edit);
router.get("/search", validateSearchUserInput, search);

export default router;
