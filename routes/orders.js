const express = require("express");
const router = express.Router();
// const Orders = require("../modules/orders");
const OrdersController = require("../controllers/orders");

router.get('/', OrdersController.orderShow);
router.get('/showall', OrdersController.orderShowAll);
router.post('/create', OrdersController.orderCreate);
router.get('/delete', OrdersController.orderDelete);
router.get('/update', OrdersController.orderUpdate);
router.get('/success', OrdersController.orderSuccess);
router.post('/edit', OrdersController.editOrders)

module.exports = router;