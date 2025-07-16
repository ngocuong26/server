const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    id_user: String,
    products: [
        {
            id_products: String,
            quantity: Number,
            name_product: String,
            img: String
        }
    ],
    total: Number,
    address: String,
    name: String,
    phone: String,
    date: Date,
    status: String
}, {
    collection: 'orders'
})

module.exports = mongoose.model('orders', orderSchema);