'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
         'produtos',
         'principio',
         {
            type: Sequelize.STRING,
            allowNull: true
         }
      )
  },

  down: (queryInterface) => {
    
      return queryInterface.removeColumn('produtos', 'principio')
    
  }
};