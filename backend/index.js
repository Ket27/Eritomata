const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routers/authRouter");
const quesRouter = require("./routers/quesRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const answerRouter = require("./routers/answerRouter");
const relationshipRouter = require("./routers/relationshipRouter");
const quesLikeRouter = require("./routers/quesLikeRouter");
const postLikeRouter = require("./routers/postLikeRouter");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', ['Content-type', 'authorization']);
    next();
})

app.use("/api/auth", authRouter);
app.use("/api/ques", quesRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/answer", answerRouter);
app.use("/api/follow", relationshipRouter);
app.use("/api/quesLikes", quesLikeRouter);
app.use("/api/postLikes", postLikeRouter);

app.listen(5000, () => {
    console.log("Server is listening to 5000");
})