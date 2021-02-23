'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('substancias_lista', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface) => {

        return queryInterface.dropTable('substancias_lista');

    }
};
