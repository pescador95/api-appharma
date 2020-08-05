'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('categorias', {
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
     id_img:{
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
      updated_at:{
         type: Sequelize.DATE,
         allowNull:true
      }   
     });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('categorias');
  }
};
