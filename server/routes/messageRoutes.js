const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/messageController');

router.get('/:userId', auth, c.getMessages);
router.post('/:userId', auth, c.sendMessage);

module.exports = router;
