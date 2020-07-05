'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.addColumn(
         'users',
         'img_id',
         {
            type:Sequelize.INTEGER,
            allowNull:true,
            references:{model:'files', key:'id'},
            onUpdate:'CASCADE',
            onDelete:'SET NULL'
         }

      )
  },

  down: async (queryInterface) => {
      queryInterface.removeColumn('users', 'img_id')
  }
};
