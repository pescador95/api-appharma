'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('principio_anvisa', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
             autoIncrement: true
         },
         principio:{
             type:Sequelize.STRING,
             allowNull:false,
         },
         mensagem:{
            type:Sequelize.STRING,
            allowNull:false
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
 
      return queryInterface.dropTable('principio_anvisa');
    
  }
};
