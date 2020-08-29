'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'vendas',
            'tipo_entrega',
            {
               type: Sequelize.STRING,
               allowNull: true,
               comment: 'Delivery / Balcao'
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('vendas', 'tipo_entrega')
      ])

   }
};