import Categoria from '../models/Categoria'

class CategoriaService {
   async CategoriaExiste({ idCategoria }) {
         
       const categoria = await Categoria.findByPk(idCategoria)

      if (!categoria) {
         throw new Error("Categoria não existe")
      }
      
      return categoria
   }


}

export default new CategoriaService()