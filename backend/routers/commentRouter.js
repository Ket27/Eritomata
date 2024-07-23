const express = require("express");
const commentRouter = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {postComment, getComment} = require("../controllers/commentController");

commentRouter 
  .route("/post/:postId")
  .post(authMiddleware, postComment);

commentRouter
  .route("/get/:postId")
  .get(authMiddleware, getComment)

module.exports = commentRouter;