const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.showProduct);
router.get('/filter', productController.showProductFilter);
router.post('/create', productController.createProduct);
router.post('/edit', productController.editProduct);
router.delete('/delete', productController.deleteProduct);
router.get('/search', productController.searchProduct);
router.get('/:id', productController.showProductDetail);

module.exports = router;