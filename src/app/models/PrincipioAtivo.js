import Sequelize, { Model } from 'sequelize'

class PrincipioAtivo extends Model {
   static init(sequelize) {
      super.init(
         {
            principio: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'principio_ativo'
         }
      )

      return this
   }

}
export default PrincipioAtivo