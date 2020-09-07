import Sequelize, { Model } from 'sequelize'

class Fcm extends Model {
   static init(sequelize) {
      super.init(
         {
            id_user:Sequelize.INTEGER,
            token: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'fcm_tokens'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.User, {foreignKey:'id_user', as:'user'})
   }



}
export default Fcm