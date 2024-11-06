import { edit } from "@/controllers/user/edit";
import search from "@/controllers/user/search";
import { verifyAuthToken } from "@/lib/jwt";
import { Router } from "express";

const router = Router();

router.put("/", verifyAuthToken, edit);
router.get("/search", search);

export default router;
