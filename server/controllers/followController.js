const User = require('../models/User');
exports.followUser = async (req, res) => {
  const me = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);
  if (!target || !me) return res.status(404).json({ message: 'User not found' });
  if (!me.following.some(id => id.equals(target._id))) {
    me.following.push(target._id);
    target.followers.push(me._id);
    await me.save(); await target.save();
  }
  res.json({ message: 'Following user' });
};
exports.unfollowUser = async (req, res) => {
  const me = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);
  if (!target || !me) return res.status(404).json({ message: 'User not found' });
  me.following.pull(target._id); target.followers.pull(me._id);
  await me.save(); await target.save();
  res.json({ message: 'Unfollowed user' });
};
