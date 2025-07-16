const mongoose = require("mongoose");

const AdminShema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, {
    collection: 'admin'
})

module.exports = new mongoose.model('admin', AdminShema);
