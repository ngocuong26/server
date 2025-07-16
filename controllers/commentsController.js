const Comments = require("../modules/comments");


class CommentsController{
    async showComments(req, res) {
        const id_user = req.session.user.id;
        const comments = await Comments.find({id_user: id_user});

        console.log(comments);
        
        res.json(comments);
    }
}

module.exports = new CommentsController();