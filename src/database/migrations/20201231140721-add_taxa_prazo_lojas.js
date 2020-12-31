'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'lojas',
            'taxa_entrega',
            {
               type: Sequelize.DECIMAL
            }
         ),
         queryInterface.addColumn(
            'lojas',
            'prazo_entrega',
            {
               type: Sequelize.INTEGER
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('lojas', 'taxa_entrega'),
         queryInterface.removeColumn('lojas', 'prazo_entrega')
      ])

   }
};