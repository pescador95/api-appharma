import Sequelize, { Model } from 'sequelize'

class Categoria extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'categorias'
         }
      )

      return this

   }



}
export default Categoria