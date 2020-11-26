import { Op, QueryTypes } from 'sequelize'
import Produto from '../models/Produto'
import ProdutoService from '../services/ProdutoService'
import db from '../../config/postgres'

class ProdutoController {

   async search(req, res) {
      const { name, data, page = 1 } = req.query

      const sql = `
      SELECT id, codigo_barras, nome, principio, image, max(preco_original) preco_original, max(qtd) as qtd_estoque, 0 as qtd, MIN(preco_vigente) as preco_vigente, MAX(discount) as discount FROM (
         SELECT p.id, p.codigo_barras, p.nome, p.descricao, p.id_tipo as tipo, 
         COALESCE(p1.preco_promocao, e.preco_venda) AS preco_vigente, e.preco_venda as preco_original, p1.preco_promocao, p1.data_inicio, p1.data_fim, f.path AS image, p.principio, 
         COALESCE((1-p1.preco_promocao / e.preco_venda)*100, 0) AS discount, e.qtd_estoque as qtd
      FROM produtos p  
       INNER JOin estoque e on p.id = e.id_produto
       left JOIN promocoes p1 ON p.id = p1.id_produto   and p1.data_inicio < :data  and p1.data_fim > :data    
        LEFT JOIN files f ON p.img_id = f.id                                                                                                    
      WHERE p.nome LIKE :search_name and e.qtd_estoque > 0   
      
     ) tmp
     GROUP BY  id, codigo_barras, nome, principio, image
     order by discount desc
    limit 10 offset :offset
      `;

      const sql_count = ` select count(*) as total
   FROM produtos p  
   INNER JOin estoque e on p.id = e.id_produto
    left JOIN promocoes p1 ON p.id = p1.id_produto   and p1.data_inicio < :data  and p1.data_fim > :data     
     LEFT JOIN files f ON p.img_id = f.id                                                                                                    
   WHERE p.nome LIKE :search_name`;

      let searchName = `%${name}%`

      try {

         const count = await Produto.sequelize.query(sql_count, {
            type: QueryTypes.SELECT,
            replacements: {
               search_name: searchName,
               data,
            }
         })

         const paginas = Math.round(count[0].total / 10)

         const offset = (page - 1) * 10

         const listaProdutos = await Produto.sequelize.query(sql, {
            type: QueryTypes.SELECT,
            replacements: {
               search_name: searchName,
               data,
               offset
            }
         });
         if (!listaProdutos) {
            return res.status(400).json({ error: "não encontrei produtos" })
         }
         return res.json({produtos:listaProdutos, paginas})
      } catch (e) {
         console.log(e.message)
      }

   }
   async selectProduct(req, res) {
      const { id } = req.query

      const params = [id, '2020-04-28T00:00:00-03']

      console.log(`Id passado: ${id}`)

      const sql = `
      SELECT p.id, p.codigo_barras, p.nome, p.descricao, p.id_tipo as tipo, p1.data_fim, p1.data_inicio, f.path AS image, p.principio,  
      COALESCE(p1.preco_promocao, e.preco_venda) AS preco_vigente, 
     e.preco_venda as preco_original, 
      p1.preco_promocao,  
      COALESCE((1-p1.preco_promocao / e.preco_venda)*100, 0) AS discount,
      e.qtd_estoque
   FROM produtos p  
   inner join estoque e on p.id = e.id_produto
   left JOIN promocoes p1 ON p.id = p1.id_produto   and p1.data_inicio < $2  and p1.data_fim > $2
   LEFT JOIN files f ON p.img_id = f.id 
 WHERE p.id = $1 and qtd_estoque > 0
 order by qtd_estoque desc
 limit 1
      `

      const produto = await db.query(sql, params)

      if (!produto) {
         return res.status(400).json({ error: "Produto não encontrado" })
      }

      return res.json(produto.rows)

   }

   async topSellers(req, res) {

      const params = ['2020-04-28T00:00:00-03', '2020-01-01T00:00:00-03', '2020-04-30T00:00:00-03']
      const sql = " SELECT tmp.id, tmp.nome, tmp.preco_vigente, tmp.preco_original, tmp.preco_promocao, image, discount, COUNT(*) AS total FROM ( " +
         "                                                                                                                                                              " +
         " SELECT p.id , p.codigo_barras, p.nome, p.descricao,                                                                                                           " +
         "        COALESCE(p1.preco_promocao, p.valor_venda) AS preco_vigente, p.valor_venda as preco_original, p1.preco_promocao, f.path AS image, p.principio,        " +
         "        COALESCE((1 - p1.preco_promocao / p.valor_venda)*100, 0) AS discount                                                                                        " +
         "     FROM produtos p                                                                                                                                          " +
         "   left JOIN promocoes p1 ON p.id = p1.id_produto  and p1.data_inicio < $1 and p1.data_fim > $1                                                            " +
         "   LEFT JOIN files f ON p.img_id = f.id                                                                                                                       " +
         "   INNER JOIN vendas v ON p.id = v.id_produto                                                                                                                 " +
         "   LEFT JOIN tipo_produto tp ON p.id_tipo = tp.id                                                                                                             " +
         "   WHERE v.data_venda BETWEEN $2 AND $3 AND p1.codigo_barras <> '12345679'                                                                " +
         "   ) tmp                                                                                                                                                      " +
         "                                                                                                                                                              " +
         "   GROUP BY  tmp.id, tmp.nome, tmp.preco_vigente, tmp.preco_original, tmp.preco_promocao,  image, discount                       " +
         "   ORDER BY total desc                                                                                                                                        " +
         "                                                                                                                                                              " +
         "   LIMIT 15                                                                                                                                                   ";


      try {
         const lista = await db.query(sql, params)
         if (!lista) {
            return res.status(400).json({ error: 'Impossivel pegar produtos' })
         }

         return res.json(lista.rows)
      } catch (e) {
         return res.status(400).json({ error: e.message })
      }

   }

   async similars(req, res) {

      const { id, tipo } = req.query;

      const params = ['2020-04-28T00:00:00-03', tipo, id]
      const sql =
         "SELECT p.id , p.codigo_barras, p.nome, p.descricao, " +
         "                 COALESCE(p1.preco_promocao, p.valor_venda) AS preco_vigente, p.valor_venda as preco_original, p1.preco_promocao, f.path AS image, p.principio, " +
         "                  COALESCE((1 - p1.preco_promocao / p.valor_venda)*100, 0) AS discount " +
         "      FROM produtos p  " +
         "      left JOIN promocoes p1 ON p.id = p1.id_produto and p1.data_inicio < $1 and p1.data_fim > $1" +
         "      LEFT JOIN files f ON p.img_id = f.id           " +
         "      INNER JOIN estoque e ON p.id = e.id_produto      " +
         "      WHERE p.id_tipo = $2 AND e.qtdestoque > 0 and p.id <> $3    " +
         "  ORDER BY discount DESC, preco_vigente asc        ";


      try {
         const lista = await db.query(sql, params)
         if (!lista) {
            return res.status(400).json({ error: 'Impossivel pegar produtos' })
         }

         return res.json(lista.rows)
      } catch (e) {
         return res.status(400).json({ error: e.message })
      }

   }

   async index(req, res) {
      const { barra } = req.params

      const produto = await ProdutoService.ProdutoExiste({ codigoBarras: barra })

      if (!produto) {
         return res.status(400).json({ error: "Poduto não encontrado" })
      }

      return res.status(200).json(produto)

   }

   async show(req, res) {

      const { page = 1 } = req.query

      const produto = await Produto.findAll({
         order: ['nome'],
         attributes: ['codigo_barras', 'nome', 'valor_venda'],
         limit: 20,
         offset: (page - 1) * 20,
      })

      res.json(produto)
   }

   async store(req, res) {

      if (!req.userAdmin) {
         return res.status(401).json({ error: "Cadastro permitido apenas para administradores" })
      }

      const produto = await Produto.create(req.body)

      if (!produto) {
         return res.status(400).json({ error: "Não foi possivel criar o produto" })
      }

      return res.status(201).json(produto)
   }

   async update(req, res) {
      if (!req.userAdmin) {
         return res.status(401).json({ error: "permitido apenas para administradores" })
      }
      const produto = await ProdutoService.ProdutoExiste({ idProduto: req.query.id })
      const produtoAtt = await produto.update(req.body)
      return res.status(201).json(produtoAtt)
   }

}
export default new ProdutoController()