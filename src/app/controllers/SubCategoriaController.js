import SubCategoria from '../models/SubCategoria'

class SubCategoriaController {
   async store (req, res) {

      const {id_categoria, descricao} = req.body
      
      const sub = await SubCategoria.create({id_categoria, descricao})

      if (!sub){
         return res.status(400).json({error:"Ocorreu um erro ao inserir a subcategoria"})
      }

      const {id} = sub

      return res.json({id, id_categoria, descricao})
   }
}

export default new SubCategoriaController()