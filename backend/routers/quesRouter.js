const express = require("express");
const {authMiddleware}= require("../middleware/authMiddleware");
const {postQues, getQues, getUserQues, getFollowerQues, getQuesById} = require("../controllers/quesController");
const quesRouter = express.Router();

quesRouter
  .route("/post")
  .post(authMiddleware, postQues);

quesRouter
  .route("/get")
  .get(authMiddleware, getQues);

quesRouter
  .route("/getUserQues/:userId")
  .get(getUserQues);

quesRouter
  .route("/get/:quesId")
  .get(authMiddleware, getQuesById)

quesRouter
  .route("/getFollowersQues")
  .get(authMiddleware, getFollowerQues);

module.exports = quesRouter;