import Produto from '../models/Produto'
import Promocao from '../models/Promocao'
import File from '../models/File'

import { startOfWeek, endOfWeek, parseISO, isValid } from 'date-fns'
import { Op } from 'sequelize'

class PromocaoController {
   async show(req, res) {
      const { date, page = 1 } = req.query

      const parsedDate = parseISO(date)

      if(!isValid(parsedDate)){
         return res.status(400).json({error:"Data invalida"})
      }


      const promocao = await Promocao.findAll({
         where: {
            data_fim: {
               [Op.between]: [startOfWeek(parsedDate), endOfWeek(parsedDate)]
            },
         },
         attributes: ['id', 'nome', 'descricao', 'preco_promocao','data_fim'],
         include: [
            {
               model: Produto,
               as: "produto",
               attributes: ['id','nome', 'valor_venda'],
               include: [
                  {
                     model: File,
                     as: "image",
                     attributes: ['id','url','path' ],
                  }
               ]
            }
         ],
         limit:20,
         offset:(page - 1) * 20,
         order: [['data_fim', 'desc']]
      })

      if (!promocao) {
         return res.status(400).json({ error: "Nenhuma promoção essa semana!" })
      }

      return res.json(promocao)

   }

}
export default new PromocaoController()
