const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");

router.get('/', CartController.showCart);
router.post('/', CartController.addCart);
router.delete('/delete/:id', CartController.cartDelete);

module.exports = router;