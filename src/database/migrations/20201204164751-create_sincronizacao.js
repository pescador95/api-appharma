'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('sincronizacao', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
            autoIncrement: true,
         },
         descricao:{
             type:Sequelize.STRING,
             allowNull:true,
         },
         horario:{
            type:Sequelize.DATE,
            allowNull:false,
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
 
      return queryInterface.dropTable('sincronizacao');
    
  }
};
