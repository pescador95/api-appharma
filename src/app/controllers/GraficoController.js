import Vendas from '../models/Venda';
import {QueryTypes} from 'sequelize'

class GrafficoController {

    async graficoVendas(req, res) {
        try {
            const sql = `
            select date(data_venda) as data_venda, status, count(*) qtdVendas, sum(valor_liquido) as totalVenda
                from vendas
                where data_venda between NOW() - interval '30 DAYS' and now()
                group by date(data_venda), status
            order by data_venda
            `
            const resp = await Vendas.sequelize.query(sql, {
                type: QueryTypes.SELECT
            })

            if(!resp){
                return res.status(400).json({error:"Não achei vendas"})
            }

            return res.status(200).json(resp)

        } catch (e) {
            console.log("Erro ao pegar grafico de vendas: " + e.message)
            return  res.status(500).json({ error: "Não carreguei info do grafico" })
        }
    }


}

export default new GrafficoController()