'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('subcategorias', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_categoria:
      {
         type:Sequelize.INTEGER,
         allowNull:true,
         references:{model:'categorias', key:'id'},
         onUpdate:'CASCADE',
         onDelete:'SET NULL'
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
   return queryInterface.dropTable('subcategorias');
  }
};
