const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const {postPost, getPost, getUserPost, getPostById} = require("../controllers/postController");
const postRouter = express.Router();

postRouter 
  .route("/post")
  .post(authMiddleware, postPost);

postRouter
  .route("/get")
 .get(authMiddleware, getPost);

postRouter
  .route("/get/:postId")
  .get(authMiddleware, getPostById)

postRouter
  .route("/getUserpost/:userId")
  .get(authMiddleware, getUserPost);

// postRouter
//   .route("/getFollowerspost")
//   .get(getFollowerspost);

module.exports = postRouter;
