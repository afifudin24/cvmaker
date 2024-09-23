const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const allowedOrigins = ['http://localhost:3000']; // Ganti dengan domain frontend Anda
  const origin = req.headers.origin;
  const token = req.cookies.token; // Ambil token dari cookie
  console.log(origin);
  if (!token) return res.sendStatus(401);
  if (allowedOrigins.includes(origin)) {
    jwt.verify(token, '123', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;

      next();
    });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

module.exports = authenticateToken;
