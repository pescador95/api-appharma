'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('app', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
             autoIncrement:true
         },
         version:{
             type:Sequelize.STRING,
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
 
      return queryInterface.dropTable('app');
    
  }
}