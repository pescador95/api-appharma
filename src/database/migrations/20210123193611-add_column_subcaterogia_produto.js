'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'produtos',
            'id_subcategoria',
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'subcategorias', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
             }
         ),
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('produtos', 'id_subcategoria'),
      ])

   }
};
