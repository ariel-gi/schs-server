import express from "express";
import { getPosts, createPost, deletePost, updatePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likepost", auth, likePost);

export default router;