import Sessao from '../models/Sessao'

class SessaoControler {
   async store(req, res){
      const {id} = await Sessao.create(req.body)
      return res.status(201).json({id})
   }
}
export default new SessaoControler()