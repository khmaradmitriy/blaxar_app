const express = require('express');
const router = express.Router();
const controller = require('../controllers/estimateItemController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

// 🔹 CRUD
router.post('/', auth, role(['admin', 'foreman']), controller.create);
router.get('/:estimateId', auth, controller.getByEstimate);
router.put('/:id', auth, role(['admin', 'foreman']), controller.update);
router.delete('/:id', auth, role(['admin', 'foreman']), controller.remove);

module.exports = router;
