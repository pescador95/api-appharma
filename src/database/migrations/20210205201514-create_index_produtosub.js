'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addIndex(
                'produto_subcategorias',
                ['id_subcategoria', 'id_produto'],
                {
                    unique: true
                }
              )
        ])

    }
};

