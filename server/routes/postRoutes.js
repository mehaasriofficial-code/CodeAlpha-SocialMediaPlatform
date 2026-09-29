const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const c = require('../controllers/postController');

router.get('/', c.getPosts);
router.get('/:id', c.getPost);
router.post('/', auth, upload.single('image'), c.createPost);
router.put('/:id', auth, c.updatePost);
router.delete('/:id', auth, c.deletePost);
router.post('/:id/like', auth, c.toggleLike);

module.exports = router;
