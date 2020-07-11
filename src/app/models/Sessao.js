import Sequelize, { Model } from 'sequelize'

class Sessao extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING
         },
         {
            sequelize,
            tableName: 'sessao'
         }
      )

      return this

   }

}
export default Sessao