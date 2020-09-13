'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'vendas',
            'id_endereco',
            {
               type: Sequelize.INTEGER,
               allowNull: true,
               references: { model: 'user_address', key: 'id' },
               onUpdate: 'CASCADE',
               onDelete: 'SET NULL'
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('vendas', 'id_endereco')
      ])

   }
};