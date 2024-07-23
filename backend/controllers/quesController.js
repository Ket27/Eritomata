const db = require("../connect");

module.exports.postQues = (req, res) => {
  const { ques } = req.body;
  const userId = req.userId;

  if (!ques) {
    return res.json({
      message: "Please write a ques",
    });
  }

  const q = "INSERT INTO questionmodel (`question`, `userId`) values (?)";

  const values = [ques, userId];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json({
        message: "Error while posting ques",
      });
    }

    return res.json({
      message: "Question posted",
      data: data,
    });
  });
};

module.exports.getQues = (req, res) => {
  const q = "SELECT q.id id, q.question question, q.createdAt createdAt, q.userId userId, u.name name from questionmodel q inner join usermodel u on q.userId = u.id order by q.createdAt desc";

  db.query(q, (err, data) => {
    if (err) {
      return res.json({
        message: "Error while getting questions",
      });
    }

    return res.json({
      message: "Here are your questions",
      data: data,
    });
  });
};

module.exports.getUserQues = (req, res) => {
  const quesUserId = req.params.userId;

  const q = "select * from questionModel where userId = ? order by questionmodel.createdAt desc";

  db.query(q, [quesUserId], (err, data) => {
    if (err) {
      return res.json({
        message: "You can't get your questions",
      });
    }

    if(!data.length){
        return res.json({
            message : "You have put no ques",
        })
    }

    return res.json({
      message: "Here are your questions",
      data: data,
    });
  });
};

module.exports.getFollowerQues = (req,res) => {
  const userId = req.userId;

  const q = "Select * from questionmodel q inner join relationship r on q.userId = r.followerId where r.followingId = ? order by q.createdAt desc";

  db.query(q, [userId], (err, data) => {
    if(err){
      console.log(err);
      return res.json({
        message : "There is an error while showing followers ques",
      })
    }

    if(!data.length){
      return res.json({
        message: "No ques by your followers",
      })
    }

    return res.json({
      message : "Here are your follower's questions",
      data : data,
    })
  })
}


module.exports.getQuesById = (req,res) => {
  const {quesId} = req.params;

  const q = "select * from questionmodel inner join usermodel on questionmodel.userId = usermodel.id where questionmodel.id = ?";

  db.query(q, [quesId], (err, data) => {
    if(err){
      console.log(err);
      return res.json({
        message : "Error",
      })
    }

    return res.json({
      message : "Here is the ques",
      data : data,
    })
  })
}