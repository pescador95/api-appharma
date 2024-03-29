'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('produtos', {
          id: {
             type: Sequelize.INTEGER, 
             primaryKey: true,
             allowNull: false,
            autoIncrement: true,
         },
         codigo_barras:{
            type:Sequelize.STRING,
            allowNull:false,
          },
          nome: {
            type: Sequelize.STRING, 
            allowNull: false
          },
          descricao: {
            type: Sequelize.STRING, 
            allowNull: true
          },   
          principio: {
            type: Sequelize.STRING, 
            allowNull: true
          },   
          img_id:
          {
             type: Sequelize.INTEGER,
             references: {model: 'files', key :'id'},
             onUpdate:'CASCADE',
             onDelete:'SET NULL',
             allowNull: true
          },
          id_grupo:
          {
             type:Sequelize.INTEGER,
             allowNull:true,
             references:{model:'grupos', key:'id'},
             onUpdate:'CASCADE',
             onDelete:'SET NULL'
          },
          id_sessao:
          {
             type:Sequelize.INTEGER,
             allowNull:true,
             references:{model:'sessao', key:'id'},
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
 
      return queryInterface.dropTable('produtos');
    
  }
};
