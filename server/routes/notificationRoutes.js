const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/notificationController');

router.get('/', auth, c.getNotifications);
router.put('/read', auth, c.markRead);

module.exports = router;
