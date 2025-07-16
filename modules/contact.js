const mongoose = require("mongoose");

const contactShema = new mongoose.Schema({
    id_user: String,
    name_user: String,
    email: String,
    title: String,
    contact: String,
    status: String,
    refly: String
}, {
    collection: 'contact'
})

module.exports = mongoose.model('contact', contactShema);