import Sequelize, { Model } from 'sequelize'

class Reserva extends Model {
   static init(sequelize) {
      super.init({
         chave_venda:Sequelize.STRING,
         id_produto: Sequelize.INTEGER,
         id_estoque: Sequelize.INTEGER,
         qtd_reserva: Sequelize.INTEGER,
         baixado:Sequelize.STRING,
      },
      {
          indexes:[
              {
                  unique: false,
                  fields: ['chave'],
                  using: 'BTREE'
              }
          ],
         sequelize, 
         tableName:"reserva_estoque"
      })

      return this;
   }

   static associate(models){
      this.hasMany(models.Produto, {foreignKey: 'id_produto'})
      this.hasMany(models.Estoque, {foreignKey: 'id_estoque'})
   }


}

export default Reserva;