const admin = require('firebase-admin')
import serviceAccount from "../../config/firebase.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appharma-b57f0.firebaseio.com"
});



const registrationTokens = [
   'cMDSj7ltQH-rMzQcuiWvzg:APA91bEQsqdakXlTWyEUycNj3Waao3y3KuDeQ6Z69Fvk3Z2Y5qUZW28ovfmaeFvcIOL-vfnoGUgDWb3Y9KH1eR2qGUCjLTpZcP1PFdJcf-6tB4YBO4Y7nbcuZ9yKo2Rs-q6J5vEKbALR',
 ];
 
 const message = {
   data: {id: '24', time: '2:45'},
   tokens: registrationTokens,
   body:"fuck",
   title:"Appharma teste"
 }
 
 export default  () => { 
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
