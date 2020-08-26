import Sequelize, { Model } from 'sequelize'

class Venda extends Model {
   static init(sequelize) {
      super.init(
         {
            codigo_venda:Sequelize.INTEGER,
            cpf:Sequelize.STRING,
            codigo_barras:Sequelize.STRING,
            id_produto: Sequelize.INTEGER,
            id_user: Sequelize.INTEGER,
            data_venda:Sequelize.DATE,
            valor_liquido:Sequelize.DECIMAL,
            troco_para:Sequelize.DECIMAL,
            levar_pinpad:Sequelize.BOOLEAN,
            tipo_venda:Sequelize.STRING,
            status:Sequelize.STRING
         },
         {
            sequelize,
            tableName: 'vendas'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.Produto, {foreignKey:'id_produto', as:'produto'})
      this.belongsTo(models.User, {foreignKey:'id_user', as:'vendas'})
   }

}
export default Venda