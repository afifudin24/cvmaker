const express = require('express');
const router = express.Router();
// const passport = require('passport');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authCheckToken = require('../middleware/authCheckMiddleware');
const jwt = require('jsonwebtoken');
router.get('/checkAuth', authCheckToken, (req, res) => {
  res.json({
    message: 'You have access to this protected route',
    user: req.user,
  });
});
// Register user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);
// router.post('/logout', authController.logout);

// Route untuk autentikasi Google
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     prompt: 'select_account',
//   }),
// );

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     session: false,
//     failureRedirect: '/login',
//   }),
//   (req, res) => {
//     // Jika autentikasi berhasil, kirim token JWT
//     console.log(req);
//     // Set the token in cookies
//     const token = req.user.token;
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: false, // Set to true in production
//       maxAge: 3600000, // 1 hour
//       sameSite: 'Strict', // Or 'Lax', based on your needs
//     });

//     // Respond with user info
//     //     res.json({
//     //       status: 'success',
//     //       message: 'Login successful',
//     //       user: {
//     //         id: req.user.user.id,
//     //         name: req.user.user.name,
//     //         email: req.user.user.email,
//     //         role: req.user.user.role,
//     //       },
//     //     });
//     res.redirect(`http://localhost:3000/main`);
// },
// );
module.exports = router;
