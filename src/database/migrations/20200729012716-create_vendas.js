'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('vendas', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
            autoIncrement: true,
         },
         codigo_venda:{
            type:Sequelize.STRING,
            allowNull:false,
         },
         cpf: {
            type: Sequelize.STRING,
            allowNull: false,
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
          data_venda:{
            type:Sequelize.DATE,
            allowNull:false,
          },
          valor_liquido:{
             type:Sequelize.DECIMAL,
             allowNull:true,
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
 
      return queryInterface.dropTable('vendas');
    
  }
};
