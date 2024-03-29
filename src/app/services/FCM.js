const admin = require('firebase-admin')
import serviceAccount from "../../config/firebase.json"
import Fcm from '../models/Fcm'

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: process.env.FIREBASE_URL
});

export const SendMessage = (message, registrationTokens) => {
   console.log("Vou mandar mensagem")

   admin.messaging().sendMulticast(message)
      .then((response) => {
         console.log(JSON.stringify(response))
         if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
               if (!resp.success) {
                  failedTokens.push(registrationTokens[idx]);
                  console.log(`${registrationTokens[idx]} - falhou`)
               } else {
                  console.log(`${registrationTokens[idx]} - enviou`)
               }
               console.log(resp)
            });
            console.log('Lista de itens que falaram: ' + failedTokens);
         }


      });
}

export const GetTokens = async (idUser,  page=1 ) => {
   console.log("Entrei em get tokens")
   if (idUser) {
      console.log("Entrei pra pegar tokens fcs do usuario " + idUser)
      try {
         const userTokens = await Fcm.findAll({ 
            where:{
               id_user:idUser 
            } 
         })
         console.log(`Eu peguei o token do usuario ${idUser} e eles são: ${userTokens}`)
         return userTokens
      } catch (e) {
         console.log(e.message)
      }
   } else {
      const broadCast = await Fcm.findAll({
         attributes:['id_user', 'token'],
         limit: 1000,
         offset: (page - 1) * 1000,
      })
      return broadCast
   }
}
