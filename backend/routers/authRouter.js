const express = require("express");
const {authLogin, authRegister, getUser, googleAuth} = require("../controllers/authController");
const authRouter = express.Router();

authRouter
  .route("/register")
  .post(authRegister)

authRouter
  .route("/login")
  .post(authLogin)

authRouter
  .route("/getUser/:id")
  .get(getUser)

authRouter
  .route("/google")
  .post(googleAuth)

module.exports = authRouter;