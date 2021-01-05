'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'lojas',
            'id_logo',
            {
                type: Sequelize.INTEGER,
                references: {model: 'files', key :'id'},
                onUpdate:'CASCADE',
                onDelete:'SET NULL',
                allowNull: true
             },
         ),
         queryInterface.addColumn(
            'lojas',
            'cor_primaria',
            {
                type: Sequelize.STRING
             },
         ),
         queryInterface.addColumn(
            'lojas',
            'cor_secundaria',
            {
                type: Sequelize.STRING
             },
         ),
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('lojas', 'id_logo'),
         queryInterface.removeColumn('lojas', 'cor_primaria'),
         queryInterface.removeColumn('lojas', 'cor_secundaria')
      ])

   }
};