import Fcm from '../models/Fcm'
import Mensagem from '../models/Mensagem'
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

      const {iduser, idmsg} = req.params


      const  tokensAux = await GetTokens(iduser, )

      if  (!tokensAux) {
         return res.status(400).json({error:"Não existem tokens para esse usuario"})
      }

      const registrationTokens = [ ];

      tokensAux.map((i,k)=> {
         registrationTokens.push(i.token)
      })


      const mgm = await Mensagem.findByPk(idmsg)

      if (!mgm){
         return res.status(400).json({error:'mensagem não existe'})
      }
      const {titulo, corpo, tipo_mgm} = mgm;

      const agora = new Date().toLocaleString('pt-br')

      const message = {
         data: { tipo: toString(tipo_mgm) , time:agora.toString(), corpo},
         tokens: registrationTokens,
         notification: {
            body: corpo,
            title: `Appharma - ${titulo}` ,
         }
      
      }
      SendMessage(message, registrationTokens);
      return res.json({mgm:"Enviei?"})
   }


}
export default new FcmController();