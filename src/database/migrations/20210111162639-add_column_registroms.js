'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'produtos',
            'registroms',
            {
               type: Sequelize.STRING
            }
         ),
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('produtos', 'registroms'),
      ])

   }
};