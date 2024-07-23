const db = require("../connect");

module.exports.postQuesLikes = (req,res) => {
    const {quesId} = req.params;
    const userId = req.userId;

    const q = "Insert Into questionlikemodel (`questionId`, `userId`) values (?)";

    const values = [quesId, userId];

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

module.exports.getQuesLikes = (req,res) => {
    const {quesId} = req.params;

    const q = "Select count(*) as likes from questionlikemodel where questionId = ?";

    db.query(q, [quesId], (err, data) => {
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