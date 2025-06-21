const express = require('express');
const router = express.Router();
const controller = require('../controllers/objectController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.use(auth);

router.get('/', controller.getAll);
router.post('/', role(['foreman']), controller.create);
router.put('/:id', role(['foreman']), controller.update);

// Только админ может назначать/откреплять прорабов
router.post('/assign', role(['admin']), controller.assignForeman);
router.post('/unassign', role(['admin']), controller.unassignForeman);

module.exports = router;
