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
         codigo_barras: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true,
          },
         id_produto:{
            type:Sequelize.INTEGER,
            references: { model: 'produtos', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          qtdestoque:{
            type:Sequelize.INTEGER,
            allowNull:false,
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
