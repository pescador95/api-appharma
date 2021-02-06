'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('produtos', 'id_categoria'),
            queryInterface.removeColumn('produtos', 'id_subcategoria'),
         ])

    }
};