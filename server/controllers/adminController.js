const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getStats = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin access required' });
  const [users, posts, comments] = await Promise.all([
    User.countDocuments(), Post.countDocuments(), Comment.countDocuments()
  ]);
  res.json({ users, posts, comments });
};
