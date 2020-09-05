import Sequelize, { Model } from 'sequelize'

class Fcm extends Model {
   static init(sequelize) {
      super.init(
         {
            token: Sequelize.STRING,
            id_user:Sequelize.INTEGER,
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