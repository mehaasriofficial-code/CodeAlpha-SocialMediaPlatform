const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username avatar').sort({ createdAt: -1 }).limit(50);
  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username avatar');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comments = await Comment.find({ post: post._id }).populate('author', 'username').sort({ createdAt: 1 });
  res.json({ post, comments });
};

exports.createPost = async (req, res) => {
  const post = await Post.create({
    author: req.user.id,
    content: req.body.content,
    image: req.file ? `/uploads/${req.file.filename}` : ''
  });
  res.status(201).json(await post.populate('author', 'username avatar'));
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
  if (!post) return res.status(404).json({ message: 'Post not found or not yours' });
  post.content = req.body.content ?? post.content;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user.id });
  if (!post) return res.status(404).json({ message: 'Post not found or not yours' });
  await Comment.deleteMany({ post: post._id });
  res.json({ message: 'Post deleted' });
};

exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const index = post.likes.findIndex(id => id.equals(req.user.id));
  if (index >= 0) post.likes.splice(index, 1);
  else {
    post.likes.push(req.user.id);
    if (!post.author.equals(req.user.id)) {
      await Notification.create({ user: post.author, message: 'Someone liked your post.' });
    }
  }
  await post.save();
  res.json({ likes: post.likes.length, liked: index < 0 });
};
