import Produto from '../models/Produto'
import ProdutoService from '../services/ProdutoService'

class ProdutoController {

   async show(req, res){

      const produto = await Produto.findAll()

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

   async destroy(req, res) {
      if (!req.userAdmin) {
         return res.status(401).json({ error: "permitido apenas para administradores" })
      }
      const produto = await ProdutoService.ProdutoExiste({ idProduto: req.query.id })
      await produto.destroy(produto)
      return res.status(200).json({ success: "Produto deletado" })

   }

}
export default new ProdutoController()