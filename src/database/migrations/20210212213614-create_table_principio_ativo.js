'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('principio_ativo', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false
         },
         principio:{
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
 
      return queryInterface.dropTable('principio_ativo');
    
  }
};
