'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'users',
            'superadmin',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:false,
             }
         ),
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('users', 'superadmin'),
      ])

   }
};

