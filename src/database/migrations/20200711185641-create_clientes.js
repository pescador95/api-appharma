'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('clientes', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         codigoErp:{
            type:Sequelize.INTEGER,
            allowNull:false,
            unique:true,
         },
         cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
         },
         nome: {
            type: Sequelize.STRING,
            allowNull: false
         },
         nascimento: {
            type: Sequelize.DATE,
            allowNull: true
         },
         sexo: {
            type: Sequelize.STRING,
            allowNull: true
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
            return queryInterface.dropTable('clientes');
         }
      };
