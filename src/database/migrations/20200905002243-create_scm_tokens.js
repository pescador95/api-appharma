'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('fcm_tokens', {
          id: {
            type: Sequelize.INTEGER, 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          id_user: {
            type: Sequelize.INTEGER,
            allowNull:true,
            references:{model:'users', key:'id'},
            onUpdate:'CASCADE',
            onDelete:'SET NULL'
         },
          token: {
            type: Sequelize.STRING, 
            allowNull: false,
            unique:true
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
 
      return queryInterface.dropTable('fcm_tokens');
    
  }
};
