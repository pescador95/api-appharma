import Sequelize, { Model } from 'sequelize'

class Estoque extends Model {
   static init(sequelize) {
      super.init(
         {
            id_loja:Sequelize.INTEGER,
            codigo_barras:Sequelize.STRING,
            id_produto: Sequelize.INTEGER,
            qtd_estoque:Sequelize.INTEGER,
            preco_venda:Sequelize.DECIMAL,
            preco_promocao:Sequelize.DECIMAL,
            fabricante:Sequelize.STRING
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
      this.belongsTo(models.Loja, {foreignKey:'id_loja', as:'lojas'})
   }

}
export default Estoque