const mongoose = require("mongoose");
const User = mongoose.model("users");
const CommentSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  parentID: {
    type: String,
    default: null,
  },
  depth: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

mongoose.model("comments", CommentSchema);

