const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', authController.register);      // регистрация
router.post('/login', authController.login);            // вход
router.post('/refresh', authController.refreshToken);   // обновление accessToken
router.post('/logout', authController.logout);          // выход
router.get('/me', auth, authController.getMe);
module.exports = router;
