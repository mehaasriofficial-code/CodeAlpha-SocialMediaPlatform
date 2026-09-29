const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
};

exports.markRead = async (req, res) => {
  await Notification.updateMany({ user: req.user.id }, { $set: { read: true } });
  res.json({ message: 'Notifications marked as read' });
};
