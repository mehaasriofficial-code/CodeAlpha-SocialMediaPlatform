# CodeAlpha Project 2 - Social Media Platform

This project follows the structure and technology visible in the first Social Media Platform video:
- Node.js
- Express.js
- MongoDB / Mongoose
- HTML, CSS, JavaScript
- JWT authentication
- Multer uploads

## Features
- User registration and login
- User profiles
- Edit profile
- Create, edit and delete posts
- Like / unlike posts
- Comments
- Follow / unfollow
- Notifications
- Private messages
- User search
- Image upload support
- Admin statistics endpoint
- Responsive frontend

## Main structure

server/
  config/db.js
  controllers/
  middleware/
  models/
  routes/
  uploads/
  utils/
  app.js
  server.js

client/
  index.html
  login.html
  register.html
  profile.html
  style.css
  app.js

## Setup
1. Install Node.js.
2. Install MongoDB and keep it running, or use MongoDB Atlas.
3. Open terminal in this folder.
4. Run:
   npm install
5. Copy `.env.example` to `.env` and update MongoDB URI if required.
6. Run:
   npm run dev
7. Open:
   http://localhost:5000

## CodeAlpha repository
CodeAlpha_SocialMediaPlatform

## Demo accounts
Register your own account from the website. No real passwords are included in this project.
