'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'estoque',
            'fabricante',
            {
               type: Sequelize.STRING
            }
         ),
         queryInterface.addColumn(
            'estoque',
            'status',
            {
               type: Sequelize.INTEGER
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('estoque', 'fabricante'),
         queryInterface.removeColumn('estoque', 'status')
      ])

   }
};