import Produto from '../models/Produto'
import Promocao from '../models/Promocao'
import File from '../models/File'
import db from '../../config/postgres'
import { Op, QueryTypes } from 'sequelize'

import { startOfWeek, endOfWeek, parseISO, isValid } from 'date-fns'
import { Op } from 'sequelize'

class PromocaoController {
    async directSell(req, res) {

        const { cpf } = req.query;
        const randomItem = Math.floor(Math.random() * 6) + 2;
        const params = ['2020-01-01', '2020-03-30', '2020-08-01', cpf]

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

        const random = Math.floor(Math.random() * 5) + 1;

        const sql = `
        SELECT * FROM (
            SELECT p.id, p.nome, p.descricao, e.preco_venda,
              COALESCE(pr.preco_promocao, e.preco_promocao) AS preco_promocao, e.qtd_estoque, 
              (1 - COALESCE(pr.preco_promocao, e.preco_promocao) /  e.preco_venda) * 100 AS percent,
              e.qtd_estoque, f.path AS image
              FROM produtos p
              INNER JOIN estoque e ON p.id = e.id_produto
              left JOIN promocoes pr ON pr.id_produto = p.id AND pr.data_inicio < NOW() AND pr.data_fim > NOW()
              LEFT JOIN files f ON f.id = p.img_id
            WHERE e.qtd_estoque > 0
              )tmp 
              WHERE tmp.preco_promocao > 0  
              ORDER BY percent desc
             LIMIT 20 -- OFFSET :page`
        const listaProdutos = await Produto.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements: {
                page: random
            }
        });
        if (!listaProdutos) {
            return res.status(400).json({ error: "não encontrei produtos" })
        }
        return res.json({ produtos: listaProdutos })



    }



    async show(req, res) {
        const { date, page = 1 } = req.query

        const parsedDate = parseISO(date)

        if (!isValid(parsedDate)) {
            return res.status(400).json({ error: "Data invalida" })
        }


        const promocao = await Promocao.findAll({
            where: {
                data_fim: {
                    [Op.between]: [startOfWeek(parsedDate), endOfWeek(parsedDate)]
                },
            },
            attributes: ['id', 'nome', 'descricao', 'preco_promocao', 'data_fim'],
            include: [
                {
                    model: Produto,
                    as: "produto",
                    attributes: ['id', 'nome', 'valor_venda'],
                    include: [
                        {
                            model: File,
                            as: "image",
                            attributes: ['id', 'url', 'path'],
                        }
                    ]
                }
            ],
            limit: 20,
            offset: (page - 1) * 20,
            order: [['data_fim', 'desc']]
        })

        if (!promocao) {
            return res.status(400).json({ error: "Nenhuma promoção essa semana!" })
        }

        return res.json(promocao)

    }

    async store(req, res){

        if (!req.userAdmin){
            return res.json({error:"Você não é administrador."})
         }


        const {codigo, nome, descricao, data_inicio, data_fim, preco_promocao, codigo_barras, id_produto, avista, prazo, cheque, cartao} = req.body;

        const resp = await Promocao.create({codigo, nome, descricao, data_inicio, data_fim, preco_promocao, codigo_barras, id_produto, avista, prazo, cheque, cartao});

        if (!resp){
            return res.status(400).json({error:"Não consegui inserir"})
        }

        return res.status(200).json(resp)
    }

    async update(req, res){
        if (!req.userAdmin){
            return res.json({error:"Você não é administrador."})
         }

         const { codigo } = req.params;

        const {nome, descricao, data_inicio, data_fim, preco_promocao, codigo_barras, id_produto, avista, prazo, cheque, cartao} = req.body;

        const promo = await Promocao.findOne({where:{codigo}});

        if (!promo){
            return res.status(400).json({error:"Não encontrei essa promoçao"})
        }
        const resp = await promo.update({nome, descricao, data_inicio, data_fim, preco_promocao, codigo_barras, id_produto, avista, prazo, cheque, cartao});

        if (!resp){
            return res.status(400).json({error:"Não consegui alterar promo"})
        }

        return res.status(200).json(resp)
    }
    
    
    

}
export default new PromocaoController()
