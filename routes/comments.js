import express from "express";
import { createComment, getComments } from "../controllers/comments.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", createComment);

export default router;
