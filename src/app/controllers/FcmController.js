import Fcm from '../models/Fcm'
import {SendMessage, GetTokens} from '../services/FCM'

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


   async sendMessage(req, res){
      
      if (!req.userAdmin){
         return res.json({error:"Você não tem permissão."})
      }
      const userId = req.userId

      const tokensAux = await GetTokens()

      const registrationTokens = [ ];

      tokensAux.map((i,k)=> {
         registrationTokens.push(i.token)
      })

      const message = {
         data: { id: '24', time: '2:45' },
         tokens: registrationTokens,
         notification: {
            body: "Teste de Broadcast",
            title: "Appharma - Testes",
         }
      
      }
      SendMessage(message, registrationTokens);
      return res.json({mgm:"Enviei?"})
   }


}
export default new FcmController();