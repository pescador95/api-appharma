import Sequelize, { Model } from 'sequelize'

class Venda extends Model {
   static init(sequelize) {
      super.init(
         {
            codigo_venda:Sequelize.INTEGER,
            cpf:Sequelize.STRING,
            codigo_barras:Sequelize.STRING,
            id_produto: Sequelize.INTEGER,
            data_venda:Sequelize.DATE,
            valor_liquido:Sequelize.DECIMAL
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
   }

}
export default Venda