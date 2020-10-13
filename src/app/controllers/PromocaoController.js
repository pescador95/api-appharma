import Produto from '../models/Produto'
import Promocao from '../models/Promocao'
import File from '../models/File'
import db from '../../config/postgres'

import { startOfWeek, endOfWeek, parseISO, isValid } from 'date-fns'
import { Op } from 'sequelize'

class PromocaoController {
   async directSell(req, res) {  
      
      const { cpf } = req.query;
      const randomItem = Math.floor(Math.random() * 6) + 2;
      const params =  ['2020-01-01', '2020-03-30', '2020-08-01', cpf ]

      const qry = `
                  SELECT p1.id, p1.nome, p1.valor_venda, p.preco_promocao, e.qtdestoque, (1 - p.preco_promocao/p1.valor_venda) * 100 AS percent, f.path AS image, p1.id_tipo as tipo  FROM promocoes p
                  INNER JOIN estoque e ON p.id_produto = e.id_produto
                  INNER JOIN produtos p1 ON e.id_produto = p1.id
                  LEFT JOIN files f ON p1.img_id = f.id
               WHERE p.id_produto IN (
                     SELECT id from (
                        SELECT p.id, p.nome, COUNT(*) total  FROM vendas v
                        INNER JOIN produtos p ON v.id_produto = p.id
                        WHERE v.data_venda BETWEEN $1 AND $2 AND v.cpf = $4
                        GROUP BY p.id, p.nome
                     HAVING COUNT(*) > 0
                           
                     )tmp
                  )
                  AND p.data_inicio <= $3 AND p.data_fim >$3 AND e.qtdestoque > 0
               
               UNION all
                  
                  SELECT p1.id, p1.nome, p1.valor_venda, p.preco_promocao, e.qtdestoque, (1 - p.preco_promocao/p1.valor_venda) * 100 AS percent, f.path AS image, p1.id_tipo as tipo FROM promocoes p
                           INNER JOIN estoque e ON p.id_produto = e.id_produto
                           INNER JOIN produtos p1 ON e.id_produto = p1.id
                           LEFT JOIN files f ON p1.img_id = f.id
                        WHERE p.id_produto IN (
                           SELECT id FROM (
                              SELECT p.id, p.nome, COUNT(*) total  FROM vendas v
                                 INNER JOIN produtos p ON v.id_produto = p.id
                                 WHERE v.data_venda BETWEEN $1 AND $2
                                 GROUP BY p.id, p.nome
                              HAVING COUNT(*) < ${randomItem}    
                              )tmp
                           )
                  AND p.data_inicio <= $3 AND p.data_fim > $3 AND e.qtdestoque > 0
               
               LIMIT 20
      `

      const result = await db.query(qry, params)

      res.send(result.rows)

   }

   async bestSellers(req, res) {   

      // const topItem = Math.floor(Math.random() * 20) + 1;
      
      const params =  ['2020-05-30' ]

      const qry = `
      SELECT p1.id, p1.nome, max(e.preco_venda) as valor_venda, max(p.preco_promocao) as preco_promocao, max(e.qtd_estoque) as qtd_estoque, (1 - max(p.preco_promocao)/max(e.preco_venda)) * 100 AS percent, f.path as image 
      FROM promocoes p
          INNER JOIN estoque e ON p.codigo_barras = e.codigo_barras
          INNER JOIN produtos p1 ON e.id_produto = p1.id
          LEFT JOIN files f ON p1.img_id = f.id
      WHERE  p.data_inicio <= $1 AND p.data_fim > $1 AND e.qtd_estoque > 0
      group by p1.id, p1.nome, f.path
       ORDER BY percent desc
       LIMIT 20
      `

      const result = await db.query(qry, params)

      res.send(result.rows)

   }



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
