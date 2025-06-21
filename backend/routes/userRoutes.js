const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// 🔹 Получить всех пользователей (только для администратора)
router.get('/', auth, role(['admin']), userController.getAll);

// 🔹 Заблокировать пользователя по ID
router.patch('/block/:id', auth, role(['admin']), userController.blockUser);

// 🔹 Разблокировать пользователя по ID
router.patch('/unblock/:id', auth, role(['admin']), userController.unblockUser);

module.exports = router;
