'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'fcm_tokens',
            'ultimo_acesso',
            {
               type: Sequelize.DATE,
               allowNull: false,
               defaultValue:Sequelize.fn('now')
            }
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('fcm_tokens', 'ultimo_acesso')
      ])

   }
};