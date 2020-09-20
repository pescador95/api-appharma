'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('params_mensagens', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
         },
          titulo: {
            type: Sequelize.STRING,
            allowNull:true
         },
          corpo: {
            type: Sequelize.STRING, 
            allowNull: false
          },
          tipo_msg: {
             type: Sequelize.INTEGER,
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
 
      return queryInterface.dropTable('params_mensagens');
    
  }
};
