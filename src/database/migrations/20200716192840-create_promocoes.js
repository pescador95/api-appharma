'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('promocoes', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         codigo: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
         nome: {
            type: Sequelize.STRING,
            allowNull: false
         },
         descricao: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         data_inicio: {
            type: Sequelize.DATE,
            allowNull: false
         },
         data_fim: {
            type: Sequelize.DATE,
            allowNull: true
         },
         preco_promocao: {
            type: Sequelize.DECIMAL,
            allowNull: false,
         },
         codigo_barras: {
            type: Sequelize.STRING,
            allowNull: false,
          },
         id_img:
         {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
         },
         id_produto:
         {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'produtos', key: 'id' },
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

   down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('promocoes');

   }
};