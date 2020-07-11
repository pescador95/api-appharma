import Grupo from '../models/Grupo'

class GrupoController {
   async store(req, res){
      const {id}  = await Grupo.create(req.body)
      return res.status(201).json({id})
   }
}
export default new GrupoController()