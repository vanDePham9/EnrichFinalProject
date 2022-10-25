const express = require('express');
const router = express.Router();
const authBuilder = require('../controllers/authController')

router.post('/register', authBuilder.register);
router.post('/login', authBuilder.login);
router.post('/refresh', authBuilder.refreshToken);
router.post('/change-password', authBuilder.changePassword);
router.post('/reset-password', authBuilder.resetPassword);
router.post('/reset-password/:userId/:token', authBuilder.confirmResetPassword);

module.exports = router;