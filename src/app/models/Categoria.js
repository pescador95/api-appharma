import Sequelize, { Model } from 'sequelize'

class Categoria extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING,
            id_img:Sequelize.INTEGER,
         },
         {
            sequelize,
            tableName: 'categorias'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.File, {foreignKey:'id_img', as:'image'})
   }



}
export default Categoria