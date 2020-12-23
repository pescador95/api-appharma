import { Op, QueryTypes } from 'sequelize'
import Reserva from '../models/Reserva'

class ReservaController {

    async show(req, res) {

        const { id_produto } = req.params;

        try {
            const qryTotal = ` select coalesce(SUM(qtd_reserva), 0) AS total_reservado 
                                     FROM reserva_estoque
                                WHERE id_produto = :id_produto and baixado = 'N'  `

            const total_reservado = await Reserva.sequelize.query(qryTotal, {
                type: QueryTypes.SELECT,
                replacements: {
                    id_produto
                }
            })

            return res.json({ total_reservado })
        } catch (e) {
            console.log(e.message)
        }

    }

    async store(req, res) {
        const { chave_venda, id_produto, id_estoque, qtd_reserva } = req.body;
        console.log(`chave venda ${chave_venda} id produto: ${id_produto} qtd: ${qtd_reserva}`)
        try {
            const reserv = Reserva.create({ chave_venda, id_produto, id_estoque, qtd_reserva });
            if (!reserv) {
                return res.status(400).json({ error: "não consegui inserir" })
            }
            return res.status(201).json({ success: "Inserido com sucesso!" });
        } catch (e) {
            console.log(e.message)
        }
    }

    async baixar(req, res) {
        const { chave_venda } = req.params;
        try {
            const reserva = await Reserva.findAll({
                where: {
                    [Op.and]: [{ chave_venda }, { 'baixado': 'N' }],
                }
            })

            if (reserva.length == 0) {
                return res.status(400).json({ error: "Não encontrei essa reserva" })
            }

            await Reserva.update({ baixado: 'S' }, {
                where: {
                    [Op.and]: [{ chave_venda }, { 'baixado': 'N' }],
                }
            })

            return res.status(200).json({ success: "Reserva baixada com sucesso!" })

        } catch (e) {
            console.log(e.message)
        }

    }

    async verifyCart(req, res) {
        const { cart } = req.body;
        let newCart = [];
        try {
            cart.map(async (item, key) => {
                const { id, qtd, qtd_estoque } = item
                const qryTotal = ` select coalesce(SUM(qtd_reserva), 0) AS total_reservado 
                             FROM reserva_estoque
                             WHERE id_produto = :id_produto and baixado = 'N'  `
                const resp = await Reserva.sequelize.query(qryTotal, {
                    type: QueryTypes.SELECT,
                    replacements: {
                        id_produto: id
                    }
                })

                const reservado = resp[0].total_reservado;

                let disponivel = qtd_estoque - reservado;

                if (qtd > disponivel){
                    newCart.push({
                        id_produto: item.id,
                        disponivel
                    })
                }   
            })
            
            return res.status(200).json({ success: "OK", indisponiveis: newCart })
        } catch (e) {
            console.log(e.message)
        }
    }
}
export default new ReservaController()
