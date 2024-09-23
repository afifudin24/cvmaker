// seeders/20230923-seed-users.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password:
          '$2a$10$e0MYI9ePGRitJfmyVktKz.O6htIoyRmNLyF2jq9ro7C6sOe9XYyqG', // hashed password for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password:
          '$2a$10$e0MYI9ePGRitJfmyVktKz.O6htIoyRmNLyF2jq9ro7C6sOe9XYyqG', // hashed password for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan user lain sesuai kebutuhan
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
