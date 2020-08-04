import Sequelize, { Model } from 'sequelize'

// Model de tipo de produto

class Tipo extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING,
         },
         {
            sequelize,
            tableName: 'tipo_produto'
         }
      )

      return this

   }



}
export default Tipo