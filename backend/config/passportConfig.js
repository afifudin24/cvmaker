// // config/passportConfig.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const userModel = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         let user = userModel.findUserByEmail(email);

//         if (!user) {
//           const users = userModel.getUsers();
//           const id = Math.floor(100 + Math.random() * 900);
//           user = {
//             id: id,
//             name: profile.displayName,
//             email: email,
//             password: '', // Tidak ada password karena autentikasi Google
//             role: 'user',
//           };
//           users.push(user);
//           userModel.saveUsers(users);

//           // Emit event ketika user baru ditambahkan
//           const { io } = require('../socket');
//           io().emit('user-added', user);
//         }

//         // Buat JWT
//         const token = jwt.sign(
//           { id: user.id, email: user.email, role: user.role },
//           process.env.JWT_SECRET,
//           { expiresIn: '1h' },
//         );

//         return done(null, { user, token });
//       } catch (error) {
//         return done(error, null);
//       }
//     },
//   ),
// );

// // Serialize dan Deserialize user (diperlukan oleh Passport)
// passport.serializeUser((data, done) => {
//   done(null, data);
// });

// passport.deserializeUser((data, done) => {
//   done(null, data);
// });
