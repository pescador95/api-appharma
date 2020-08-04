import Sequelize, { Model } from 'sequelize'

class SubCategoria extends Model {
   static init(sequelize) {
      super.init(
         {
            descricao: Sequelize.STRING,
            id_categoria:Sequelize.INTEGER
         },
         {
            sequelize,
            tableName: 'subcategorias'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.Categoria, {foreignKey:'id_categoria', as:'categoria'})
      this.belongsToMany(models.Produto, {
         through: 'produto_categorias',
         as: 'produtos',
         foreignKey:'id_subcategoria'
      })
   }

}
export default SubCategoria