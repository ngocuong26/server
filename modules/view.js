const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
    total_view: Number,
    id_view: String
}, {
    collection: 'view'
})

module.exports = new mongoose.model('view', viewSchema);