const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookmarks", BookmarkSchema);
