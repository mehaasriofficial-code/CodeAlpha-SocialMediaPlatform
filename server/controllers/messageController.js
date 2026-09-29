const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user.id }
    ]
  }).populate('sender receiver', 'username').sort({ createdAt: 1 });
  res.json(messages);
};

exports.sendMessage = async (req, res) => {
  const message = await Message.create({
    sender: req.user.id,
    receiver: req.params.userId,
    message: req.body.message
  });
  res.status(201).json(message);
};
