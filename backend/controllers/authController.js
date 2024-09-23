const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config();

// Fungsi untuk menghasilkan JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, roles: user.Roles.map((role) => role.name) },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
};

const AuthController = {
  // Registrasi User
  register: async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
      // Cek apakah email sudah digunakan
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat user baru
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Atur peran jika diberikan, jika tidak default ke 'user'
      if (roles && roles.length > 0) {
        const roleRecords = await Role.findAll({ where: { name: roles } });
        await user.setRoles(roleRecords);
      } else {
        const userRole = await Role.findOne({ where: { name: 'user' } });
        await user.setRoles([userRole]);
      }

      res.status(201).json({ message: 'User berhasil dibuat' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
    }
  },

  // Login User
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Cari user berdasarkan email
      const user = await User.findOne({
        where: { email },
        include: Role,
      });
      if (!user) {
        return res.status(400).json({ message: 'Email atau password salah' });
      }

      // Periksa password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email atau password salah' });
      }

      // Buat token JWT
      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true, // Cookie tidak dapat diakses melalui JavaScript
        secure: false, // Hanya kirim cookie melalui HTTPS di production
        maxAge: 3600000, // Durasi cookie (1 jam)
        sameSite: 'Strict',
      });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.Roles.map((role) => role.name),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat login' });
    }
  },

  // Logout User (Jika Menggunakan Refresh Token, Implementasikan di Sini)
  logout: (req, res) => {
    // Implementasi logout tergantung pada strategi autentikasi yang digunakan
    res.json({ message: 'Logout berhasil' });
  },

  // Mendapatkan Profile User (Protected Route)
  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email'],
        include: {
          model: Role,
          attributes: ['name'],
          through: { attributes: [] }, // Tidak perlu atribut dari tabel pivot
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }

      res.json({ user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Terjadi kesalahan saat mengambil profile' });
    }
  },
};

module.exports = AuthController;
