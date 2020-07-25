import Cliente from '../models/Cliente'


class ClienteController {

   async index(req, res){
      const { cpf } = req.params;

      const exists = await Cliente.findOne({where:{cpf}})
      if (!exists){
         return res.status(200).json({error:"Cliente não existe"})
      }

      return res.status(200).json({success:"Cliente existe", id:exists.id})

   }

}
export default new ClienteController();