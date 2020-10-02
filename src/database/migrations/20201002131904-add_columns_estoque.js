'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'estoque',
            'preco_venda',
            {
               type: Sequelize.DECIMAL
            }
         ),
         queryInterface.addColumn(
            'estoque',
            'preco_promocao',
            {
               type: Sequelize.DECIMAL
            }
         ),
      ])
   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('estoque', 'preco_venda'),
         queryInterface.removeColumn('estoque', 'preco_promocao')
      ])
      

   }
};
