import Sequelize, { Model } from 'sequelize'

class Cliente extends Model {
   static init(sequelize) {
      super.init(
         {
            codigoErp:Sequelize.INTEGER,
            cpf:Sequelize.STRING,
            nome: Sequelize.STRING,
            nascimento:Sequelize.DATE,
            sexo: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'clientes'
         }
      )

      return this

   }

}
export default Cliente