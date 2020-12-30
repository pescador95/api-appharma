import Sequelize, { Model } from 'sequelize'

class Loja extends Model {
   static init(sequelize) {
      super.init(
         {
            cnpj:Sequelize.STRING,
            descricao:Sequelize.STRING,
            whatsapp:Sequelize.STRING
         },
         {
            sequelize,
            tableName: 'lojas'
         }
      )
      return this
   }

}
export default Loja