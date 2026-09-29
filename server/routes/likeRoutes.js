const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/likeController');

router.post('/:id', auth, c.likePost);
router.delete('/:id', auth, c.unlikePost);

module.exports = router;
