const express = require("express");
const relationshipRouter = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const { follow, countFollowing, countFollowers, followingOrNot } = require("../controllers/relationshipController");

relationshipRouter
  .route("/post/:id")
  .post(authMiddleware, follow);

relationshipRouter
  .route("/getFollowing/:id")
  .get(authMiddleware, countFollowing);
  
relationshipRouter
  .route("/getFollowers/:id")
  .get(authMiddleware, countFollowers);

relationshipRouter
  .route("/followingOrNot/:id")
  .get(authMiddleware, followingOrNot);

module.exports = relationshipRouter;