'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'users',
            'whatsapp',
            {
               type: Sequelize.STRING
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('users', 'whatsapp')
      ])

   }
};