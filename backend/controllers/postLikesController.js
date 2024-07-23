const db = require("../connect");

module.exports.postPostLikes = (req,res) => {
    const {postId} = req.params;
    const userId = req.userId;

    const q = "Insert Into postlikemodel (`postId`, `userId`) values (?)";

    const values = [postId, userId];

    db.query(q, [values], (err, data) => {
        if(err) {
            console.log(err);
            return res.json({
                message : "Error while posting likes",
            })
        }

        return res.json({
            message: "Liked",
        })
    })
}

module.exports.getPostLikes = (req,res) => {
    const {postId} = req.params;

    const q = "SELECT p.post AS post, COUNT(pl.id) AS likes FROM postmodel p LEFT JOIN postlikemodel pl ON p.id = pl.postId WHERE p.id = ? GROUP BY p.id, p.post";

    db.query(q, [postId], (err, data) => {
        if(err) {
            console.log(err);
            return res.json({
                message : "Error while getting likes",
            })
        }

        return res.json({
            message : "Count of likes",
            data: data,
        })
    })
}