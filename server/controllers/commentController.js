const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comment = await Comment.create({ post: post._id, author: req.user.id, text: req.body.text });
  await comment.populate('author', 'username');
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username').sort({ createdAt: 1 });
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user.id });
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.json({ message: 'Comment deleted' });
};
