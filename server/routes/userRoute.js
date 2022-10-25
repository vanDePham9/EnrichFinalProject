const express = require('express');
const router = express.Router();
const userBuilder = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const {verifyAdminRole} = require('../middlewares/verifyRole');

router.get('/', verifyToken, verifyAdminRole, userBuilder.list_all_Users);
router.post('/', verifyToken, verifyAdminRole, userBuilder.create_a_Users);
router.get('/:UserId', verifyToken,verifyAdminRole, userBuilder.read_a_User);
router.put('/:UserId', verifyToken,verifyAdminRole, userBuilder.update_a_User);
router.delete('/:UserId', verifyToken,verifyAdminRole, userBuilder.delete_a_User);

module.exports = router;