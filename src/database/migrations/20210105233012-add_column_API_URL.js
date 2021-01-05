'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'lojas',
            'API_URL',
            {
                type: Sequelize.STRING,
                allowNull:false,
                defaultValue:"https://approachmobile.company/api/"
             },
         )
      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('lojas', 'API_URL'),
      ])

   }
};