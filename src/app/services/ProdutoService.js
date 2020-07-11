import Produto from '../models/Produto'

class ProdutoService {
   async ProdutoExiste({idProduto}){
      const produto = await Produto.findByPk(idProduto)
      if (!produto){
         throw new Error("Produto não existe")
      }
      return produto
   }
}

export default new ProdutoService()