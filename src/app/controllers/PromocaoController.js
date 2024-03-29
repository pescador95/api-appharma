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
              e.qtd_estoque, 
                case 
                    when p.classe_terapeutica = 1 and p.id_grupo in (3, 13)  then (select path from files where id = 1042)
                    when p.classe_terapeutica = 2 and p.id_grupo in (3, 13)  then (select path from files where id = 1041)
                    when p.classe_terapeutica = 1 and p.id_grupo = 2  then (select path from files where id = 1043)
                    when p.classe_terapeutica = 2 and p.id_grupo = 2  then (select path from files where id = 1044)
                    else f.path
                end AS image
              FROM produtos p
              INNER JOIN estoque e ON p.id = e.id_produto
              left JOIN promocoes pr ON pr.id_produto = p.id AND pr.data_inicio < NOW() AND pr.data_fim > NOW()
              LEFT JOIN files f ON f.id = p.img_id
            WHERE e.qtd_estoque > 0
              )tmp 
              WHERE tmp.preco_promocao > 0  
              ORDER BY percent desc
             LIMIT 20 OFFSET :page`
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

    async destaques(req, res){
        const sql = `select * from (
            select p.id, 
                p.codigo_barras, 
                p.nome, 
                p.descricao,
                e.qtd_estoque, 
                f.path,
                e.preco_venda as preco_original,
                CASE
                  WHEN COALESCE(p1.preco_promocao, e.preco_promocao) > 0 then COALESCE(p1.preco_promocao, e.preco_promocao)
                  WHEN COALESCE(p1.preco_promocao, e.preco_promocao) <= 0 then e.preco_venda 
                END AS preco_vigente,
                CASE
                  WHEN COALESCE((1-p1.preco_promocao / e.preco_venda)*100, (1-e.preco_promocao / e.preco_venda)*100) < 100 THEN COALESCE((1-p1.preco_promocao / e.preco_venda)*100, (1-e.preco_promocao / e.preco_venda)*100)
                  ELSE 0 
                END AS discount,
                e.id as id_estoque, 0 as qtd, p.principio
            FROM produtos p
            inner JOIN estoque e ON p.id = e.id_produto
            LEFT JOIN promocoes p1 ON p1.id_produto = p.id AND  data_inicio < now() AND data_fim > now()
            left JOIN files f ON f.id = p.img_id
            WHERE qtd_estoque > 0 ) tmp
             where tmp.discount > 0 
             order by tmp.discount desc`

             try {
                 const destaques = await Promocao.sequelize.query(sql, {
                     type:QueryTypes.SELECT
                 })
                 if (!destaques){
                     return res.status(400).json({error:"não encontrei destaques"})
                 }
                 return res.status(200).json(destaques)
             } catch (e){
                 console.log("não consegui pegar destaques: "+ e.message)
                 return res.status(500).json({error:"nao peguei destaques."})
             }


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
