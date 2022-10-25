const express = require('express');
const router = express.Router();
const cartBuilder = require('../controllers/cartController');
const verifyToken = require('../middlewares/verifyToken');
const { verifyAdminRole } = require('../middlewares/verifyRole');

router.get('/', verifyToken, cartBuilder.list_a_carts);
router.get('/all', verifyToken, verifyAdminRole, cartBuilder.list_all_carts);
router.post('/', verifyToken, cartBuilder.create_a_cart);
router.delete('/:cartId', verifyToken, cartBuilder.delete_a_cart);

module.exports = router;