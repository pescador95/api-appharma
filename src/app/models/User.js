import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
   static init(sequelize) {
      super.init({
         cpf:Sequelize.STRING,
         name: Sequelize.STRING,
         email: Sequelize.STRING,
         password: Sequelize.VIRTUAL,
         password_hash: Sequelize.STRING,
         admin: Sequelize.BOOLEAN,
         img_id:Sequelize.INTEGER,
         whatsapp:Sequelize.STRING,
         dt_nasc:Sequelize.DATE,
         superadmin: Sequelize.BOOLEAN,
      },
      {
         sequelize
      })

      this.addHook('beforeSave', async user =>{
         if(user.password){
            user.password_hash=await bcrypt.hash(user.password,8)
         }
      });
      return this;
   }

   static associate(models){
      this.belongsTo(models.File, { foreignKey: 'img_id', as: 'image'})
      this.hasMany(models.UserAddress, {foreignKey: 'id_user'})
      this.hasMany(models.Venda, {foreignKey: 'id_user', as: 'vendas'})
   }

   checkPassword(password){
      return bcrypt.compare(password, this.password_hash)
   }

}

export default User;