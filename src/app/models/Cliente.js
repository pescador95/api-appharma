import Sequelize, { Model } from 'sequelize'

class Cliente extends Model {
   static init(sequelize) {
      super.init(
         {
            cpf:Sequelize.STRING,
            nome: Sequelize.STRING,
            dataNascimento: Sequelize.DATE,
            sexo: Sequelize.STRING
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