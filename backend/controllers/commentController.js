const db = require("../connect");

module.exports.postComment = (req,res) => {
    const {comment} = req.body;
    const userId = req.userId;
    const {postId} = req.params;

    if(!comment){
        return res.json({
            message : "Atleast write the comment",
        })
    }

    const q = "INSERT INTO commentmodel (`comment`, `userId`, `postId`) values (?)";

    const values = [comment, userId, postId];

    db.query(q, [values], (err, data) => {
        if(err) {
            console.log(err);
            return res.json({
                message : "Error while posting comment",
            })
        }
        
        return res.json({
            message : "Comment Posted",
            data : comment,
        })
    })
}

module.exports.getComment = (req,res) => {
    const {postId} = req.params;

    const q = "select a.comment, a.createdAt, a.userId, u.name from commentmodel a inner join usermodel u on a.userId = u.id where a.postId = ? order by a.createdAt desc";

    db.query(q, [postId], (err, data) => {
        if(err){
            return res.json({
                message : "Error while showing comments",
            })
        }

        if(!data.length){
            return res.json({
                message : "NO comments posted till now",
            })
        }

        return res.json({
            message : "Here are the comments",
            data : data,
        })
    })
}