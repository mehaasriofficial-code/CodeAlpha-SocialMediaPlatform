const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/followController');

router.post('/:id', auth, c.followUser);
router.delete('/:id', auth, c.unfollowUser);

module.exports = router;
