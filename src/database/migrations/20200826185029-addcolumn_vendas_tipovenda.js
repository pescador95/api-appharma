'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return Promise.all([
         queryInterface.addColumn(
            'vendas',
            'tipo_venda',
            {
               type: Sequelize.STRING,
               allowNull: false,
               comment: 'A - vendas no APP; I - vendas importadas; S - vendas no site',
               defaultValue: 'I'
            }
         ),
         queryInterface.addColumn(
            'vendas',
            'levar_pinpad',
            {
               type: Sequelize.BOOLEAN,
               allowNull: true
            }
         ),
         queryInterface.addColumn(
            'vendas',
            'troco_para',
            {
               type: Sequelize.DECIMAL,
               allowNull: true
            }
         ),
         queryInterface.addColumn(
            'vendas',
            'id_user',
            {
               type: Sequelize.INTEGER,
               allowNull: true,
               references: { model: 'users', key: 'id' },
               onUpdate: 'CASCADE',
               onDelete: 'SET NULL'
            }
         ),
         queryInterface.addColumn(
            'vendas',
            'status',
            {
               type: Sequelize.STRING,
               comment: 'Pendente, Confirmado, Enviado, Finalizado, Cancelado'
            }
         )


      ])

   },

   down: (queryInterface) => {

      return Promise.all([
         queryInterface.removeColumn('vendas', 'id_user'),
         queryInterface.removeColumn('vendas', 'tipo_venda'),
         queryInterface.removeColumn('vendas', 'levar_pinpad'),
         queryInterface.removeColumn('vendas', 'troco_para'),
         queryInterface.removeColumn('vendas', 'status')
      ])

   }
};