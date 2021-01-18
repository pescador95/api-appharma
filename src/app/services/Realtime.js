import firebase from 'firebase-admin'
import '@firebase/database'
// Initialize Firebase

const RealtimeApi = {
    confirmaVenda: async () => {
        const db = firebase.database().ref();
        let valor = await db.child('vendas').once('value')

        let numero = valor.val().numero
        numero += 1;

        await db.child('vendas').update({
            numero
        })

    }

}

export default () => RealtimeApi;