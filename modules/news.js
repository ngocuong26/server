const mongoose = require("mongoose");

const NewsShema = new mongoose.Schema({
    title: String,
    content: String,
    description: String
}, {
    collection: 'news'
})

module.exports = mongoose.model('news', NewsShema);