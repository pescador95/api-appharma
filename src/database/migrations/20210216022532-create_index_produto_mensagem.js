'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addIndex(
                'produtos_mensagem',
                ['id_produto', 'id_mensagem'],
                {
                    unique: true
                }
              )
        ])

    }
};