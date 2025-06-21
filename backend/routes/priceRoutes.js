const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// 🔹 Получить все позиции
router.get('/', auth, priceController.getAll);

// 🔹 Получить позицию по ID
router.get('/:id', auth, priceController.getById);

// 🔹 Создать позицию (admin или foreman)
router.post('/', auth, role(['admin', 'foreman']), priceController.create);

// 🔹 Обновить позицию
router.put('/:id', auth, role(['admin']), priceController.update);

// 🔹 Удалить позицию
router.delete('/:id', auth, role(['admin']), priceController.remove);

module.exports = router;
