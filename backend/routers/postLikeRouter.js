const express = require("express");
const postLikeRouter = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const { postPostLikes, getPostLikes } = require("../controllers/postLikesController");

postLikeRouter 
  .route("/post/:postId")
  .post(authMiddleware, postPostLikes);

postLikeRouter
  .route("/get/:postId")
  .get(authMiddleware, getPostLikes);

module.exports = postLikeRouter;