import Sequelize, { Model } from 'sequelize'

class Produto extends Model {
   static init(sequelize) {
      super.init(
         {
            id_produto:Sequelize.VIRTUAL,
            codigo_barras:Sequelize.STRING,
            nome: Sequelize.STRING,
            descricao: Sequelize.STRING,
            img_id: Sequelize.INTEGER,
            id_grupo:Sequelize.INTEGER,
            id_sessao:Sequelize.INTEGER,
            id_tipo:Sequelize.INTEGER,
            principio:Sequelize.STRING,
            registroms:Sequelize.STRING,
            id_principio:Sequelize.INTEGER,
            classe_terapeutica:Sequelize.INTEGER
         },
         {
            sequelize,
            tableName: 'produtos'
         }
      )

      return this

   }

   static associate(models) {
      this.belongsTo(models.File, {foreignKey:'img_id', as:'image'})
      this.belongsTo(models.Grupo, {foreignKey:'id_grupo', as:'grupo'})
      this.belongsTo(models.Sessao, {foreignKey:'id_sessao', as:'sessao'})
      this.belongsTo(models.Tipo, {foreignKey:'id_tipo', as:'tipo'})
   }

}
export default Produto