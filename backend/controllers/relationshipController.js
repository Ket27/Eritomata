const db = require("../connect");

module.exports.follow = (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (id == userId) {
    return res.json({
      message: "You can't follow yourself",
    });
  }
  let q = "Insert into relationship (`followerId`, `followingId`) values (?)";

  const values = [userId, id];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "error while following",
      });
    }

    return res.json({
      message: "You have followed successfully",
      data: data,
    });
  });
};

module.exports.followingOrNot = (req, res) => {
    const { id } = req.params;
  const userId = req.userId;
  let q =
    "Select id from relationship where followerId = ? and followingId = ?";

  db.query(q, [userId, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "error while fetching",
      });
    }

    if (id == userId) {
        return res.json({
          message: "You can't follow yourself",
        });
      }

    if (data.length) {
      return res.json({
        message: "Already following",
      });
    }

    return res.json({
      message : "You can follow this account",
    })
  });
};

module.exports.countFollowing = (req, res) => {
  const { id } = req.params;

  const q = "select count(*) Following from relationship where followerId = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json({
        message: "error while getting followers count",
      });
    }
    if (!data) {
      res.json({
        message: "No Following",
      });
    }
    return res.json({
      message: "Here is your count",
      data: data,
    });
  });
};

module.exports.countFollowers = (req, res) => {
  const { id } = req.params;

  const q = "select count(*) Followers from relationship where followingId = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json({
        message: "error while getting following count",
      });
    }
    if (!data) {
      res.json({
        message: "No Followers",
      });
    }
    return res.json({
      message: "Here is your count",
      data: data,
    });
  });
};
