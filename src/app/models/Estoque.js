import Sequelize, { Model } from 'sequelize'

class Estoque extends Model {
   static init(sequelize) {
      super.init(
         {
            codigo_barras:Sequelize.STRING,
            id_produto: Sequelize.INTEGER,
            qtdestoque:Sequelize.INTEGER,
            preco_venda:Sequelize.DECIMAL,
            preco_promocao:Sequelize.DECIMAL,
         },
         {
            sequelize,
            tableName: 'estoque'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.Produto, {foreignKey:'id_produto', as:'produto'})
   }

}
export default Estoque