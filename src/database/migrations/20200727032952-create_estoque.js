'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('estoque', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
            autoIncrement: true,
         },
         id_loja: {
            type:Sequelize.INTEGER,
            references: { model: 'lojas', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull:false,
         },
         codigo_barras: {
            type: Sequelize.STRING,
            allowNull: false,
          },
         id_produto:{
            type:Sequelize.INTEGER,
            references: { model: 'produtos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          qtd_estoque:{
            type:Sequelize.INTEGER,
            allowNull:false,
          },
          preco_venda:{
            type:Sequelize.DECIMAL,
            allowNull:false,
          },
          preco_promocao:{
            type:Sequelize.DECIMAL,
            allowNull:false,
          },
          fabricante: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          status: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          created_at: {
            type: Sequelize.DATE, 
            allowNull: false
          },
          updated_at:{
             type: Sequelize.DATE,
             allowNull:true
          }   
         });
  },

  down: (queryInterface) => {
 
      return queryInterface.dropTable('estoque');
    
  }
};
