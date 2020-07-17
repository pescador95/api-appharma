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
         codigoPromocao: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
         nomePromocao: {
            type: Sequelize.STRING,
            allowNull: false
         },
         descricaoPromo: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         dataInicio: {
            type: Sequelize.DATE,
            allowNull: false
         },
         dataFim: {
            type: Sequelize.DATE,
            allowNull: true
         },
         precoPromocao: {
            type: Sequelize.DECIMAL,
            allowNull: false,
         },
         codigoDeBarra: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         img_id:
         {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'files', key: 'id' },
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