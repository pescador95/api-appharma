import Sequelize, { Model } from 'sequelize'

class Loja extends Model {
   static init(sequelize) {
      super.init(
         {
            cnpj:Sequelize.STRING,
            descricao:Sequelize.STRING,
            whatsapp:Sequelize.STRING,
            taxa_entrega:Sequelize.DECIMAL,
            prazo_entrega:Sequelize.INTEGER
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