import Categoria from '../models/Categoria'

class CategoriaController {
   async store (req, res) {

      const {descricao} = req.body
      
      const categoria = await Categoria.create({descricao})

      if (!categoria){
         return res.status(400).json({error:"Ocorreu um erro ao inserir a categoria"})
      }

      const {id} = categoria

      return res.json({id, descricao})
   }
}

export default new CategoriaController()