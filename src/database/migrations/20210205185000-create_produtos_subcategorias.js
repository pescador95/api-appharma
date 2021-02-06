'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('produto_subcategorias', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
         },
         id_produto: {
            type: Sequelize.INTEGER,
            references: { model: 'produtos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
         },
         id_subcategoria: {
            type: Sequelize.INTEGER,
            references: { model: 'subcategorias', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
         },
         created_at: {
            type: Sequelize.DATE,
            allowNull: false
         },
         updated_at: {
            type: Sequelize.DATE,
            allowNull: true
         }
      });
   },

   down: (queryInterface) => {

      return queryInterface.dropTable('produto_subcategorias');

   }
};
