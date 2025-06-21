const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimateController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// 🔹 Создание сметы
router.post('/', auth, role(['admin', 'foreman']), estimateController.create);

// 🔹 Получение смет по объекту
router.get('/object/:objectId', auth, estimateController.getByObject);

// 🔹 Обновление сметы
router.put('/:id', auth, role(['admin', 'foreman']), estimateController.update);

// 🔹 Удаление сметы
router.delete('/:id', auth, role(['admin']), estimateController.remove);

module.exports = router;
