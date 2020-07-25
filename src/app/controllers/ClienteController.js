import Cliente from '../models/Cliente'


class ClienteController {

   async index(req, res){
      const { cpf } = req.params;

      const exists = await Cliente.findOne({where:{cpf}})
      if (!exists){
         return res.status(400).json({error:false})
      }

      return res.status(200).json({success:true})

   }

}
export default new ClienteController();