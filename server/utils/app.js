const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', '..', 'client')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/posts', require('../routes/postRoutes'));
app.use('/api/comments', require('../routes/commentRoutes'));
app.use('/api/follows', require('../routes/followRoutes'));
app.use('/api/likes', require('../routes/likeRoutes'));
app.use('/api/messages', require('../routes/messageRoutes'));
app.use('/api/notifications', require('../routes/notificationRoutes'));
app.use('/api/admin', require('../routes/adminRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', project: 'CodeAlpha Social Media Platform' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
});

module.exports = app;
