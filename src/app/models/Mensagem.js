import Sequelize, { Model } from 'sequelize'

class Mensagem extends Model {
   static init(sequelize) {
      super.init(
         {
            titulo: Sequelize.STRING,
            corpo: Sequelize.STRING,
            tipo_msg:Sequelize.INTEGER,
         }, 
         {
            sequelize,
            tableName: 'params_mensagens',

         }
      )
      return this

   }

}
export default Mensagem