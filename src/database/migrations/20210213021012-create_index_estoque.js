'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addIndex(
                'estoque',
                ['id_loja'],
                {
                    unique: false
                }
              ),
              queryInterface.addIndex(
                'estoque',
                ['id_produto'],
                {
                    unique: false
                }
              ),
              queryInterface.addIndex(
                'estoque',
                ['id_produto', 'id_loja'],
                {
                    unique: true
                }
              )
        ])

    }
};