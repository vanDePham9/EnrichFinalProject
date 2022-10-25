const express = require('express');
const router = express.Router();
const productBuilder = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');
const {verifyProductManagerRole} = require('../middlewares/verifyRole');


router.get('/', verifyToken, productBuilder.list_all_products);
router.post('/', verifyToken, verifyProductManagerRole, productBuilder.create_a_product);
router.get('/:productId', verifyToken, verifyProductManagerRole, productBuilder.read_a_product);
router.put('/:productId', verifyToken, verifyProductManagerRole, productBuilder.update_a_product);
router.delete('/:productId', verifyToken, verifyProductManagerRole, productBuilder.delete_a_product);

module.exports = router;