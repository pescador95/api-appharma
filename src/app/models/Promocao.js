import Sequelize, { Model } from 'sequelize'

class Promocao extends Model {
   static init(sequelize) {
      super.init(
         {
            codigoPromocao:Sequelize.INTEGER,
            nomePromocao: Sequelize.STRING,
            descricaoPromo: Sequelize.STRING,
            dataInicio:Sequelize.DATE,
            dataFim:Sequelize.DATE,
            precoPromocao: Sequelize.DECIMAL,
            codigoDeBarra:Sequelize.STRING,
            img_id: Sequelize.INTEGER
         },
         {
            sequelize,
            tableName: 'promocoes'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.File, {foreignKey:'img_id', as:'image'})
     }

}
export default Promocao