const Post = require('../models/Post');
exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (!post.likes.some(id => id.equals(req.user.id))) post.likes.push(req.user.id);
  await post.save();
  res.json({ likes: post.likes.length });
};
exports.unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  post.likes.pull(req.user.id);
  await post.save();
  res.json({ likes: post.likes.length });
};
