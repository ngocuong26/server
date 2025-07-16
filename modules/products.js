const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id_product: String,
    name: String,
    price: Number,
    img: String,
    category: {
        parent: String,
        child: String
    },
    description: String,
    quantity: Number
}, {
    collection: 'products'
})

module.exports = mongoose.model('products', ProductSchema)