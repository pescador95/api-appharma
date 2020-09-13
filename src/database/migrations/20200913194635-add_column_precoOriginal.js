'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'vendas',
            'valor_original',
            {
               type: Sequelize.DECIMAL,
               allowNull: false,
               defaultValue:0.00
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('vendas', 'valor_original')
      ])

   }
};