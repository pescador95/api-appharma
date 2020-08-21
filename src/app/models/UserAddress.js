import Sequelize, { Model } from 'sequelize'

class UserAddress extends Model {
   static init(sequelize) {
      super.init(
         {
            id_user:Sequelize.INTEGER,
            rua:Sequelize.STRING,
            numero: Sequelize.STRING,
            complemento: Sequelize.STRING,
            bairro: Sequelize.STRING,
            cidade:Sequelize.STRING,
            uf: Sequelize.STRING,
            cep: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'user_address'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.User, {foreignKey:'id_user'} )
   }

}
export default UserAddress 