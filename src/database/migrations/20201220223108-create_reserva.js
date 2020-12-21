'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('reserva_estoque', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
            autoIncrement: true,
         },
         chave_venda:{
             type:Sequelize.STRING,
             allowNull:false,
         },
         id_produto:{
            type:Sequelize.INTEGER,
            references: { model: 'produtos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          id_estoque:{
            type:Sequelize.INTEGER,
            references: { model: 'estoque', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          qtd_reserva:{
            type:Sequelize.INTEGER,
            allowNull:false,
          },
          baixado:{
            type:Sequelize.STRING,
            allowNull:false,
            defaultValue:'N'
          },
          created_at: {
            type: Sequelize.DATE, 
            allowNull: false
          },
          updated_at:{
             type: Sequelize.DATE,
             allowNull:false
          }   
         });
  },

  down: (queryInterface) => {
 
      return queryInterface.dropTable('reserva_estoque');
    
  }
};
