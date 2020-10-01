'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'produtos',
            'fabricante',
            {
               type: Sequelize.STRING
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('produtos', 'fabricante')
      ])

   }
};