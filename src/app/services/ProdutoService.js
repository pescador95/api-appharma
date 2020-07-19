import Produto from '../models/Produto'
import File from '../models/File'

class ProdutoService {
   async ProdutoExiste({ idProduto, codigoBarras }) {
      let produto;

      // Se passar codigo de barras, retorna uma consulta. Se passa id retorna outra.
      if (codigoBarras) {
         produto = await Produto.findOne(
            {
               where: { codigo_barras: codigoBarras },
               attributes: ['id', 'nome', 'valor_venda'],
               include: [
                  {
                     model: File,
                     as: "image",
                     attributes: ['name', 'path', 'url']
                  }
               ]
            })
         } 

         if(idProduto){
             produto = await Produto.findByPk(idProduto)
         }


      
      if (!produto) {
         throw new Error("Produto não existe")
      }
      return produto
   }


}

export default new ProdutoService()