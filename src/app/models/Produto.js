import Sequelize, { Model } from 'sequelize'

class Produto extends Model {
   static init(sequelize) {
      super.init(
         {
            nome: Sequelize.STRING,
            descricao: Sequelize.STRING,
            valor_custo: Sequelize.DECIMAL,
            valor_venda: Sequelize.DECIMAL,
            img_id: Sequelize.INTEGER,
         },
         {
            sequelize,
            tableName: 'produtos'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.File, {foreignKey:'img_id', as:'image'})
   }

}
export default Produto