'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserInfos', [
      {
        userId: 1,
        name: 'John Doe',
        age: 30,
        bornDate: new Date('1993-05-15'),
        address: '123 Main St, Springfield',
        hobby: 'Fishing', // Misalnya hobby dihubungkan ke tabel hobbies dengan id 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: 'Jane Smith',
        age: 25,
        bornDate: new Date('1998-08-22'),
        address: '456 Elm St, Springfield',
        hobby: 'Coding', // Misalnya hobby dihubungkan ke tabel hobbies dengan id 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan lebih banyak entri jika diperlukan
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserInfos', null, {});
  },
};
