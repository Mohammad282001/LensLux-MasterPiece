'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'john.doe@example.com',
        password_hash: "hashedPassword",
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '123-456-7890',
        date_of_birth: new Date('1990-01-01'),
        role: 'user',
        face_shape: 'oval',
        soft_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.smith@example.com',
        password_hash: "hashedPassword",
        first_name: 'Jane',
        last_name: 'Smith',
        phone_number: '098-765-4321',
        date_of_birth: new Date('1992-05-05'),
        role: 'admin',
        face_shape: 'round',
        soft_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};