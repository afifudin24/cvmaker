const bcrypt = require('bcryptjs');
const { User, Role, UserInfo } = require('../models');
const { where } = require('sequelize');

const UserController = {
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
        return res.status(400).json({ message: 'Email Already Used' });
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
    } catch (err) {
      return res.status(400).json({ message: 'Failed Create User' });
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
        return res.status(400).json({ message: 'User Not Found' });
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
  addUserInfo: async (req, res) => {
    const { userId, name, age, bornDate, address, hobby } = req.body;
    try {
      const userInfo = await UserInfo.findOne({ where: { userId: userId } });
      if (userInfo) {
        return res.status(500).json({ message: 'Failed Add User Info' });
      }
      const newUserInfo = await UserInfo.create({
        userId,
        name,
        age,
        bornDate,
        address,
        hobby,
      });
      if (!newUserInfo) {
        return res.status(404).json({ message: 'Failed Add User Info' });
      }
      res.json({
        message: 'Success Add User Info',
        data: newUserInfo,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Failed Add User Info',
        err: err,
      });
    }
  },
  updateUserInfo: async (req, res) => {
    const { id } = req.params;
    const { name, age, bornDate, address, hobby } = req.body;

    try {
      const userInfo = await UserInfo.findOne({ where: { userId: id } });
      if (!userInfo) {
        return res.status(404).json({
          message: 'User Not Found',
        });
      }
      if (name) userInfo.name = name;
      if (age) userInfo.age = age;
      if (bornDate) userInfo.bornDate = bornDate;
      if (address) userInfo.address = address;
      if (hobby) userInfo.hobby = hobby;

      userInfo.save();
      res.json({
        message: 'Success Update User Info',
        data: userInfo,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Failed Update User Info',
      });
    }
  },
};

module.exports = UserController;
