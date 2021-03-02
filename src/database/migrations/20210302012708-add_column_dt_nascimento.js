'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'users',
            'dt_nasc',
            {
                type: Sequelize.DATE,
                allowNull: true
             }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('users', 'dt_nasc'),
      ])

   }
};