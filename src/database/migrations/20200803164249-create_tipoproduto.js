'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('tipo_produto', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
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

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('tipo_produto');
  }
};
