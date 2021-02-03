const firebase = require('firebase-admin')
require('@firebase/database')
// Initialize Firebase

exports.confirmaVenda = async function () {

    await firebase.auth().signInWithEmailAndPassword('sistemas@approachmobile.company', 123456);

    const db = firebase.database().ref();
    let valor = await db.child('vendas').once('value')

    let numero = valor.val().numero
    numero += 1;

    await db.child('vendas').update({
        numero
    })
}