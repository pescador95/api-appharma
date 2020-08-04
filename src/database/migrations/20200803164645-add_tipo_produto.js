'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
         'produtos',
         'id_tipo',
         {
            type: Sequelize.INTEGER,
            references: {model: 'tipo_produto', key :'id'},
            onUpdate:'CASCADE',
            onDelete:'SET NULL',
            allowNull: true
         }
      )
  },

  down: (queryInterface) => {
    
      return queryInterface.removeColumn('produtos', 'tipo_produto')
    
  }
};
