'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'vendas',
            'usuario_alteracao',
            {
               type: Sequelize.STRING,
               allowNull: true
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('vendas', 'usuario_alteracao')
      ])

   }
};