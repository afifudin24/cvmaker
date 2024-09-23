const jwt = require('jsonwebtoken');

// Middleware untuk mengecek role
function checkRole(allowedRoles) {
  return function (req, res, next) {
    const token = req.cookies.token;
    console.log('');

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    // Verifikasi token
    jwt.verify(token, '123', (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid Token' });

      // Cek apakah role user sesuai dengan yang diizinkan
      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient Role' });
      }

      req.user = user; // Set data user ke req untuk akses di controller berikutnya
      next();
    });
  };
}

module.exports = checkRole;
