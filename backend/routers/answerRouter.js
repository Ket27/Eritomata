const express = require("express");
const answerRouter = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {postAnswer, getAnswer} = require("../controllers/answerController");

answerRouter 
  .route("/post/:quesId")
  .post(authMiddleware, postAnswer);

answerRouter
  .route("/get/:quesId")
  .get(authMiddleware, getAnswer);

module.exports = answerRouter;