const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnailKey: {
    type: String,
  },
  videoKey: {
    type: String,
  },
  imageKey: {
    type: String,
  },
  userID: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

mongoose.model("posts", PostSchema);
