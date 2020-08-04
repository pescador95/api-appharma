import Tipo from '../models/Tipo'

class TipoController {
   async store (req, res) {

      const {descricao} = req.body
      
      const tipo = await Tipo.create({descricao})

      if (!tipo){
         return res.status(400).json({error:"Ocorreu um erro ao inserir a tipo"})
      }

      const {id} = tipo

      return res.json({id, descricao})
   }
}

export default new TipoController()