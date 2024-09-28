'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Glasses', 'frame_shape', {
      type: Sequelize.STRING(100),
      allowNull: false,  // Set to NOT NULL
    });

    await queryInterface.addColumn('Glasses', 'face_frame_shape', {
      type: Sequelize.STRING(100),
      allowNull: false,  // Set to NOT NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Glasses', 'frame_shape');
    await queryInterface.removeColumn('Glasses', 'face_frame_shape');
  }
};
