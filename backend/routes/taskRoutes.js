const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// 🔹 Монтажник
router.get('/active', auth, role(['worker']), controller.getActiveByWorker);
router.get('/my', auth, role(['worker']), controller.getAllByWorker);
router.post('/take', auth, role(['worker']), controller.takeTask);
router.post('/refuse', auth, role(['worker']), controller.refuseTask);

// 🔹 Прораб / Админ
router.post('/assign', auth, role(['admin', 'foreman']), controller.assignByForeman);
router.patch('/:id/status', auth, role(['admin', 'foreman']), controller.updateStatus);

module.exports = router;
