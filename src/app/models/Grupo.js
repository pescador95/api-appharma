import Sequelize, { Model } from 'sequelize'

class Grupo extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING
         },
         {
            sequelize,
            tableName: 'grupos'
         }
      )

      return this

   }

}
export default Grupo