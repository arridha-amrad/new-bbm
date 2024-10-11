import search from "@/controllers/user/search";
import { Router } from "express";

const router = Router();

router.get("/search", search);

export default router;
