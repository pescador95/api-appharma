import Sequelize, { Model } from 'sequelize'

class Loja extends Model {
   static init(sequelize) {
      super.init(
         {
            cnpj:Sequelize.STRING,
            descricao:Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'Lojas'
         }
      )
      return this
   }

}
export default Loja