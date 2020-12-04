import Sequelize, { Model } from 'sequelize'

class Sincronizacao extends Model {
   static init(sequelize) {
      super.init(
         {
             descricao: Sequelize.STRING,
             horario:Sequelize.DATE,
         },
         {
            sequelize,
            tableName: 'sincronizacao'
         }
      )

      return this

   }

}
export default Sincronizacao