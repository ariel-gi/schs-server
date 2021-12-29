import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  teacher: String,
  period: String,
  class: String,
  title: String,
  message: String,
  name: String,
  creator: String,
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostHomework = mongoose.model("PostHomework", postSchema);

export default PostHomework;
