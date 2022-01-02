import PostHomework from "../models/postHomework.js";
import express from "express";
import mongoose from "mongoose";
import PostComment from "../models/postComment.js";

export const getPosts = async (req, res) => {
  try {
    const postHomework = await PostHomework.find();

    res.status(200).json(postHomework);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const teacher = new RegExp(searchQuery, "i");

    const posts = await PostHomework.find({ teacher: teacher });
    console.log(posts);

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newHomework = new PostHomework({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newHomework.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

  const updatedPost = await PostHomework.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

  await PostHomework.findByIdAndRemove(_id);
  await PostComment.deleteMany({ postId: _id });

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

  const post = await PostHomework.findById(_id);

  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((_id) => _id !== String(req.userId));
  }

  const updatedPost = await PostHomework.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatedPost);
};
