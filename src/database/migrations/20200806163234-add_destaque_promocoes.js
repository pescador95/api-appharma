'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
         'promocoes',
         'destaque',
         {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
         }
      )
  },

  down: (queryInterface) => {
    
      return queryInterface.removeColumn('promocoes', 'destaque')
    
  }
};