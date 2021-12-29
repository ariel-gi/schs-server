import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  pfp: String,
  commenter: String,
  comment: String,
  postId: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostComment = mongoose.model("PostComment", postSchema);

export default PostComment;
