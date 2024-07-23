const db = require("../connect");

module.exports.postAnswer = (req,res) => {
    const {answer} = req.body;
    const userId = req.userId;
    const {quesId} = req.params;

    if(!answer){
        return res.json({
            message : "Atleast write the answer",
        })
    }

    const q = "INSERT INTO answermodel (`answer`, `userId`, `questionId`) values (?)";

    const values = [answer, userId, quesId];

    db.query(q, [values], (err, data) => {
        if(err) {
            console.log(err);
            return res.json({
                message : "Error while posting answer",
            })
        }

        return res.json({
            message : "Comment Posted",
            data : answer,
        })
    })
}

module.exports.getAnswer = (req,res) => {
    const {quesId} = req.params;

    const q = "select a.answer, a.createdAt, a.userId, u.name from answermodel a inner join usermodel u on a.userId = u.id where a.questionId = ? order by a.createdAt desc";

    db.query(q, [quesId], (err, data) => {
        if(err){
            return res.json({
                message : "Error while showing answers",
            })
        }

        if(!data.length){
            return res.json({
                message : "NO answers posted till now",
            })
        }

        return res.json({
            message : "Here are the answers",
            data : data,
        })
    })
}