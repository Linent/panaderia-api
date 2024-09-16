const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productController');

router.post('/create', productosController.createProducto);
router.post('/update/:_id', productosController.updateProduct);
router.put('/status/:_id', productosController.updateProductStatus);
router.get('/get', productosController.getProducts);

module.exports = router;
