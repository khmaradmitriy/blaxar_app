const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskItemController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// Получить все позиции задачи
router.get('/:taskId', auth, controller.getByTask);

// Добавить новую позицию
router.post('/', auth, role(['admin', 'foreman']), controller.create);

// Обновить позицию
router.put('/:id', auth, role(['admin', 'foreman']), controller.update);

// Удалить позицию
router.delete('/:id', auth, role(['admin', 'foreman']), controller.remove);

module.exports = router;

