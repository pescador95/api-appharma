import Cliente from '../models/Cliente'


class ClienteController {

   async index(req, res){
      const { cpf } = req.params;

      const cliente = await Cliente.findOne({where:{cpf}})
      if (!cliente){
         return res.status(400).json({error:"Cliente não existe"})
      }

      return res.status(200).json({success:"Cliente existe", cliente:{id:cliente.id, nome:cliente.nome} })

   }

}
export default new ClienteController();