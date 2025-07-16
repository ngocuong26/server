const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    password: String,
    img: String,
    date: Date
}, {
    collection: 'user'
})

module.exports = mongoose.model('user', UserShema);