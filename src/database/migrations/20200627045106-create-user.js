'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('users', {
          id: {
            type: Sequelize.INTEGER, 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          cpf: {
            type: Sequelize.STRING,
            unique:true,
            allowNull: false
         },
          name: {
            type: Sequelize.STRING, 
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: true
          },
          password_hash: {
            type: Sequelize.STRING, 
            allowNull: false
          },
          admin:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          img_id:
          {
             type:Sequelize.INTEGER,
             allowNull:true,
             references:{model:'files', key:'id'},
             onUpdate:'CASCADE',
             onDelete:'SET NULL'
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
 
      return queryInterface.dropTable('users');
    
  }
};
