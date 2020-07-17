'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('produtos', {
          id: {
            type: Sequelize.INTEGER, 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          codigo_barras:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
          },
          nome: {
            type: Sequelize.STRING, 
            allowNull: false
          },
          descricao: {
            type: Sequelize.STRING, 
            allowNull: true
          },
          valor_custo: {
            type: Sequelize.DECIMAL, 
            allowNull: true
          },
          valor_venda: {
            type: Sequelize.DECIMAL, 
            allowNull: false
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
