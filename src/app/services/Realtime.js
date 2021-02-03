const firebase = require('firebase-admin')
require('@firebase/database')

exports.confirmaVenda = async function () {

    try {
        const user = await firebase.auth().signInWithEmailAndPassword('sistemas@approachmobile.company', '123456')
        console.log("Peguei user: " + JSON.stringify(user))
    } catch (error) {
        console.log("pau.."+JSON.stringify(error))
    }




    const db = firebase.database().ref();
    let valor = await db.child('vendas').once('value')

    let numero = valor.val().numero
    numero += 1;

    await db.child('vendas').update({
        numero
    })
}