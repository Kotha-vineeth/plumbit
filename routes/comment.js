const express = require("express");
const mongoose = require("mongoose");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

const Comment = mongoose.model("comments");

router.post("/create/comment", ensureAuth, async (req, res) => {
  try {
    const commentData = req.body;
    const author = req.user;

    const comment = await Comment.create({
      ...req.body,
      author: author.displayName,
      authorImage: author.image,
    });
    console.log(comment);
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

router.get("/fetch/reply", ensureAuth, async (req, res) => {
  const parentID = req.query.parentID;
  const parentDepth = Number(req.query.parentDepth);

  try {
    const comments = await Comment.find({
      parentID: parentID,
      depth: parentDepth + 1,
    });
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
});
router.post("/toggle-like-dislike/comment", ensureAuth, async (req, res) => {
  const commentId = req.body.commentId;
  const userId = req.user._id;

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    // Check if the user has already liked the comment
    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      // If the user has already liked, unlike
      comment.likes.pull(userId);
    } else {
      // If the user hasn't liked, like
      comment.likes.push(userId);
    }
    console.log(comment.likes);
    // Save the updated comment
    await comment.save();

    // Send the updated information to the client
    res.status(200).json({
      success: true,
      isLiked: !isLiked, // Toggle the liked status
      likeDislikeCount: comment.likes.length ,
    });
  } catch (error) {
    console.error('Error in toggle-like-dislike:', error);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

module.exports = router;


