'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      hexagons: {
        allowNull: false,
        type: Sequelize.JSONB,
        defaultValue: "[{ x: 0, y: 0, color: 'blue' }]"
      },
      startingAttrs: {
        allowNull: false,
        type: Sequelize.JSONB,
        defaultValue: "[{ color: 'blue', image: null }]"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Maps');
  }
};