const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/userController');

router.get('/search', controller.searchUsers);
router.get('/:id', controller.getProfile);
router.put('/profile', auth, upload.single('avatar'), controller.updateProfile);
router.post('/:id/follow', auth, controller.toggleFollow);

module.exports = router;
