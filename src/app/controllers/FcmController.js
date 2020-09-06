import Fcm from '../models/Fcm'

class FcmController {

   async store(req, res){
      const { token } = req.body;
      const existe = await Fcm.findOne({where:{token}})
      if (existe){
         return res.status(400).json({error:'token já cadastrado'})
      }
      const fcm  = await Fcm.create({token})
      return res.json({fcm})
   }

   async update(req, res){
      const {token} = req.body;
      const userId = req.userId;
      const celularToken = Fcm.findOne({where:{token}})
      if(!celularToken){
         return res.status(400).json({error:"não encontrei o token"})
      }
      const atualizedCelularToken = (await celularToken).update({id_user:userId})
      return res.json({sucess:'atualizado com o id do usuario', atualizedCelularToken})
   }

   async show(req, res){
      const {page = 1} = req.query
      const tokens = await Fcm.findAll({
         limit:20,
         offset:(page - 1) * 20,
      });

   }

}
export default new FcmController();