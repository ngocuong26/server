const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id_user: String,
    items: [
        {
            id_product: String,
            name_product: String,
            price: Number,
            quantity: Number,
            img: String,
            status: String
        }
    ]
}, {
    collection: 'cart'
});

module.exports = mongoose.model('cart', cartSchema)