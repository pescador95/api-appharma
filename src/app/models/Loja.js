import Sequelize, { Model } from 'sequelize'

class Loja extends Model {
    static init(sequelize) {
        super.init(
            {
                cnpj: Sequelize.STRING,
                descricao: Sequelize.STRING,
                whatsapp: Sequelize.STRING,
                taxa_entrega: Sequelize.DECIMAL,
                prazo_entrega: Sequelize.INTEGER,
                id_logo: Sequelize.INTEGER,
                cor_primaria:Sequelize.STRING,
                cor_secundaria:Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'lojas'
            }
        )
        return this
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'id_logo', as: 'logo' })
    }

}
export default Loja