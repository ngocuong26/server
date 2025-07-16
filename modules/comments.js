const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    id_product: String,
    id_user: String,
    content: String,
    star: Number,
    createdAt: String
}, {
    collection: 'comments'
});

module.exports = mongoose.model('comments', commentsSchema);