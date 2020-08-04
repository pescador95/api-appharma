'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('produto_categorias', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_produto:{
         type:Sequelize.INTEGER,
         references:{model: 'produtos', key:'id'},
         onDelete: 'CASCADE',
         allwNull: false
      },
      id_subcategoria:{
         type:Sequelize.INTEGER,
         references:{model: 'subcategorias', key:'id'},
         onDelete: 'CASCADE',
         allwNull: false
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
   return queryInterface.dropTable('produto_categorias');
  }
};
