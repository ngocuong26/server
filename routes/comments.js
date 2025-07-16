const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/commentsController");

router.get('/', CommentsController.showComments);


module.exports = router;