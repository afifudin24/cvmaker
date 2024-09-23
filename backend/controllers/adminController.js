const bcrypt = require('bcryptjs');
const { User, Role, UserInfo } = require('../models');
const { where } = require('sequelize');

const AdminController = {
  // Mendapatkan semua pengguna beserta role dan informasi pengguna
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Role,
            // as: 'Roles',
            attributes: ['name'], // Ambil nama role
            through: { attributes: [] }, // Tidak perlu atribut dari tabel pivot
          },
          {
            model: UserInfo,
            as: 'userInfo',
            attributes: ['name', 'age', 'bornDate', 'address', 'hobby'], // Ambil atribut UserInfo yang diperlukan
          },
        ],
      });

      res.json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  },

  // Mendapatkan pengguna berdasarkan ID
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        include: [
          {
            model: Role,
            attributes: ['name'],
            through: { attributes: [] },
          },
          {
            model: UserInfo,
            as: 'userInfo',
            attributes: ['name', 'age', 'bornDate', 'address', 'hobby'],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Terjadi kesalahan saat mengambil data pengguna' });
    }
  },

  createUser: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(404).json({ message: 'Email Already Used' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      // if role true
      if (role && role.length > 0) {
        const roleRecords = await Role.findAll({
          where: { name: role },
        });
        await newUser.setRoles(roleRecords);
      } else {
        const userRole = await Role.findOne({ where: { name: 'user' } });
        await newUser.setRoles([userRole]);
      }
      res.json({
        message: 'Success Created User',
        data: newUser,
      });
    } catch (err) {
      return res.status(400).json({ message: 'Failed Create User' });
    }
  },
  createAdmin: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(404).json({ message: 'Email Already Used' });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      // if role true
      if (role && role.length > 0) {
        const roleRecords = await Role.findAll({
          where: { name: role },
        });
        await newUser.setRoles(roleRecords);
      } else {
        const userRole = await Role.findOne({ where: { name: 'admin' } });
        await newUser.setRoles([userRole]);
      }
      res.json({
        message: 'Success Created Adminr',
        data: newUser,
      });
    } catch (err) {
      return res.status(400).json({ message: 'Failed Create Admin' });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const user = await User.findByPk(id, {
        include: [
          {
            model: Role,
            attributes: ['name'],
            through: { attributes: [] },
          },
          {
            model: UserInfo,
            as: 'userInfo',
          },
        ],
      });
      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await user.save();

      res.json({
        message: 'Update Success',
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed Update Data',
      });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }
      await user.destroy();
      res.json({
        message: 'User Deleted Successfully',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed Delete User',
      });
    }
  },
};

module.exports = AdminController;
