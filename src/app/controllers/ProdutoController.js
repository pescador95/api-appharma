import Produto from '../models/Produto'
import ProdutoService from '../services/ProdutoService'
import db from '../../config/postgres'

class ProdutoController {

   async selectProduct(req, res) {
      const { id } = req.query

      const params = [id, '2020-04-30T00:00:00-03']

      const sql = "SELECT p.codigo_barras, p.nome, p.descricao,                                                                                              " +
                        "       COALESCE(p1.preco_promocao, p.valor_venda) AS preco, p1.preco_promocao, p1.data_inicio, p1.data_fim, f.path AS image, p.principio, " +
                        "       COALESCE(p1.preco_promocao / p.valor_venda*100, 0) AS discount                                                                     " +
                        "  FROM produtos p                                                                                                                         " +
                        "  left JOIN promocoes p1 ON p.id = p1.id_produto                                                                                         " +
                        "  LEFT JOIN files f ON p.img_id = f.id                                                                                                    " +
                        "WHERE p.id = $1 AND p1.data_inicio <= $2 AND p1.data_fim > $2                                                                               ";

      const produto = await db.query(sql, params)

      if (!produto){
         return res.status(400).json({error:"Produto não encontrado"})
      }

      return res.json(produto.rows)

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
         c
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