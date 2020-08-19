'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('user_address', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
         },
         id_user: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
         },
         rua: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         numero: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         complemento: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         bairro: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         cidade: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         uf: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         cep: {
            type: Sequelize.STRING,
            allowNull: true,
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

      return queryInterface.dropTable('user_address');

   }
};
