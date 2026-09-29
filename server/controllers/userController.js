const User = require('../models/User');
const Notification = require('../models/Notification');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.searchUsers = async (req, res) => {
  const q = req.query.q || '';
  const users = await User.find({ username: { $regex: q, $options: 'i' } }).select('username bio avatar');
  res.json(users);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.bio = req.body.bio ?? user.bio;
  if (req.file) user.avatar = `/uploads/${req.file.filename}`;
  await user.save();
  res.json({ message: 'Profile updated', user: { id: user._id, username: user.username, bio: user.bio, avatar: user.avatar } });
};

exports.toggleFollow = async (req, res) => {
  const target = await User.findById(req.params.id);
  const me = await User.findById(req.user.id);
  if (!target || !me) return res.status(404).json({ message: 'User not found' });
  if (target._id.equals(me._id)) return res.status(400).json({ message: 'You cannot follow yourself' });

  const index = me.following.findIndex(id => id.equals(target._id));
  if (index >= 0) {
    me.following.splice(index, 1);
    target.followers.pull(me._id);
  } else {
    me.following.push(target._id);
    target.followers.push(me._id);
    await Notification.create({ user: target._id, message: `@${me.username} started following you.` });
  }
  await me.save();
  await target.save();
  res.json({ following: index < 0 });
};
