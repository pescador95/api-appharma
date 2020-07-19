import Produto from '../models/Produto'
import ProdutoService from '../services/ProdutoService'

class ProdutoController {

   async index(req, res) {
      const {barra} = req.params
      
      const produto = await ProdutoService.ProdutoExiste({ codigoBarras : barra})
      
      if(!produto){
         return res.status(400).json({error:"Poduto não encontrado"})
      }

      return res.status(200).json(produto)

   }
   
   async show(req, res){

      const {page=1} = req.query

      const produto = await Produto.findAll({
         order:['nome'],
         attributes:['codigo_barras', 'nome', 'valor_venda'],
         limit:20,
         offset:(page - 1) * 20,      
      })

      res.json(produto)
   }

   async store(req, res) {

      if (!req.userAdmin) {c
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