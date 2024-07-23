const express = require("express");
const quesLikeRouter = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const { postQuesLikes, getQuesLikes } = require("../controllers/quesLikeController");

quesLikeRouter 
  .route("/post/:quesId")
  .post(authMiddleware, postQuesLikes);

quesLikeRouter
  .route("/get/:quesId")
  .get(authMiddleware, getQuesLikes);

module.exports = quesLikeRouter;