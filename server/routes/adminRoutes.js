const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/adminController');

router.get('/stats', auth, c.getStats);

module.exports = router;
