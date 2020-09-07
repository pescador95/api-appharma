const admin = require('firebase-admin')
import serviceAccount from "../../config/firebase.json"
import Fcm from '../models/Fcm'

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://appharma-b57f0.firebaseio.com"
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
               }
               console.log(resp)
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
         }


      });
}

export const GetTokens = async (idUser, page=1) => {
   console.log("Entrei pra pegar tokens fcs do usuario " + idUser)
   if (idUser) {
      try {
         const userTokens = await Fcm.findAll({ 
            where:{
               id_user:idUser 
            } 
         })
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
