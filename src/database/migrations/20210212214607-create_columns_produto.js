'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'produtos',
            'id_principio',
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'principio_ativo', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
             }
         ),
         queryInterface.addColumn(
            'produtos',
            'classe_terapeutica',
            {
                // CLASSE TERAPEUTIA PARA SABER SE É PSICOTROPICO OU ANTIMICROBIANO
                type: Sequelize.INTEGER,
                allowNull: true
             }
         ),
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('produtos', 'id_principio'),
         queryInterface.removeColumn('produtos', 'classe_terapeutica'),
      ])

   }
};

