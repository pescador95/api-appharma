import Sequelize, { Model } from 'sequelize'

class Promocao extends Model {
   static init(sequelize) {
      super.init(
         {
            codigo:Sequelize.INTEGER,
            nome: Sequelize.STRING,
            descricao: Sequelize.STRING,
            data_inicio:Sequelize.DATE,
            data_fim:Sequelize.DATE,
            preco_promocao: Sequelize.DECIMAL,
            codigo_barras:Sequelize.STRING,
            id_img: Sequelize.INTEGER,
            id_produto: Sequelize.INTEGER,
            avista:Sequelize.INTEGER,
            prazo:Sequelize.INTEGER,
            cheque:Sequelize.INTEGER, 
            cartao:Sequelize.INTEGER,
         }, 
         {
            sequelize,
            tableName: 'promocoes',

         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.File, {foreignKey:'id_img', as:'image'})
      this.belongsTo(models.Produto, {foreignKey:'id_produto', as:'produto'})

     }

}
export default Promocao