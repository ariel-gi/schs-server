import PostComment from "../models/postComment.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
  const comment = req.body;

  const newComment = new PostComment(comment);

  try {
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const postComments = await PostComment.find();

    res.status(200).json(postComments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
