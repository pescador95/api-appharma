const firebase = require('firebase-admin')
require('@firebase/database')
require("firebase/auth");

// Initialize Firebase

exports.confirmaVenda = async function () {

    try{
        const user = await firebase.auth().signInWithEmailAndPassword('sistemas@approachmobile.company', '123456')
        console.log(JSON.stringify(user))

    } catch (error) {
        console.log(JSON.stringify(error))
    }




    const db = firebase.database().ref();
    let valor = await db.child('vendas').once('value')

    let numero = valor.val().numero
    numero += 1;

    await db.child('vendas').update({
        numero
    })
}