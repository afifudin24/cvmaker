// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const dotenv = require('dotenv');
const { initializeSocket } = require('./socket');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cvRoutes = require('./routes/cvRoutes');
// const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

require('./config/passportConfig');

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.get('/test', (req, res) => {
  const origin = req.get('origin');
  console.log(origin);
  res.send('Server is working');
});

// Buat server HTTP
const server = http.createServer(app);

// Inisialisasi Socket.IO
initializeSocket(server, allowedOrigins);

// Jalankan server
server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
