'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'lojas',
            'whatsapp',
            {
               type: Sequelize.STRING,
               allowNull: false,
               defaultValue:"45999254574"
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('lojas', 'whatsapp')
      ])

   }
};