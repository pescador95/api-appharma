import Sequelize, { Model } from 'sequelize'

class PodutoSubcategorias extends Model {
   static init(sequelize) {
      super.init(
         {
            id_produto: Sequelize.INTEGER,
            id_subcategoria:Sequelize.INTEGER
         },
         {
            sequelize,
            tableName: 'produto_subcategorias'
         }
      )

      return this

   }

}
export default PodutoSubcategorias