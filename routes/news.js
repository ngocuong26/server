const express = require("express");
const router = express.Router();
const News = require("../modules/news");
const { model } = require("mongoose");

router.get('/', async (req, res) => {
    const news = await News.find();

    const id = req.query.id;
    const newDetail = await News.findOne({_id: id});
    if (newDetail) {
        return res.json(newDetail);
    }
    res.json(news);
})

module.exports = router;