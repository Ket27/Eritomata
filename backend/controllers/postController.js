const db = require("../connect");

module.exports.postPost = (req, res) => {
  const { post } = req.body;
  const userId = req.userId;

  if (!post) {
    return res.json({
      message: "Please write a post",
    });
  }

  const q = "INSERT INTO postmodel (`post`, `userId`) values (?)";

  const values = [post, userId];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "Error while posting post",
      });
    }

    return res.json({
      message: "post posted",
      data: data,
    });
  });
};

module.exports.getPost = (req, res) => {
  const q = "SELECT p.id id, p.post post, p.userId userId, p.createdAt createdAt, u.name name from postmodel p inner join usermodel u on p.userId = u.id order by p.createdAt desc";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "Error while getting posts",
      });
    }

    return res.json({
      message: "Here are the posts",
      data: data,
    });
  });
};

module.exports.getUserPost = (req, res) => {
  const {userId} = req.params;


  const q = "select * from postModel where userId = ? order by postmodel.createdAt desc";

  db.query(q, [userId], (err, data) => {
    if (err) {
      return res.json({
        message: "You can't get your posts",
      });
    }

    if(!data.length){
        return res.json({
            message : "You have put no post",
        })
    }

    return res.json({
      message: "Here are your post",
      data: data,
    });
  });
};

module.exports.getPostById = (req,res) => {
  const {postId} = req.params;

  const q = "select * from postmodel inner join usermodel on postmodel.userId = usermodel.id where postmodel.id = ?";

  db.query(q, [postId], (err, data) => {
    if(err){
      console.log(err);
      return res.json({
        message : "Error",
      })
    }

    return res.json({
      message : "Here is the post",
      data : data,
    })
  })
}

// module.exports.getFollowerQues = (req,res) => {

// }
