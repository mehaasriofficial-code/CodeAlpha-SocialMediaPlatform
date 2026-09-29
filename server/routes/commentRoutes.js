const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/commentController');

router.get('/post/:postId', c.getComments);
router.post('/post/:postId', auth, c.addComment);
router.delete('/:id', auth, c.deleteComment);

module.exports = router;
