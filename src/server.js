import app from './app'
const { resolve } = require('path');
// const https = require('https')
const http = require('http')
// import fs from 'fs'
const port = process.env.APP_PORT;

// let existe = fs.existsSync(resolve(__dirname, 'config', 'privkey.pem'));

// if (existe) {
//     console.log("Existe chave...")
//     const options = {
//         key: fs.readFileSync(resolve(__dirname, 'config', 'privkey.pem'), 'utf-8'),
//         cert: fs.readFileSync(resolve(__dirname, 'config', 'fullchain.pem'), 'utf-8')
//     }

//     const server = https.createServer(options, app)
//         .listen(port, () => {
//             console.log(`enviroment: ${process.env.APP_ENV}`)
//             console.log(`estamos online na porta  ${process.env.APP_PORT}`)
//         })

//     const socket = io(server)

//     socket.on('connection', (sock) => {
//         console.log("Recebendo conexão do cliente...")

//         sock.on('venda-recebida', (codigo_venda) => {
//             console.log(`Venda recebida, codigo: ${codigo_venda}`)
//             sock.codigo_venda = codigo_venda

//             console.log('isso é o codigo no sock: ' + sock.codigo_venda)

//             console.log(`enviando uma mensagem para o retaguarda... `)
//             socket.emit('tem-venda', sock.codigo_venda)
//         })

//     })



// } else {

console.log("Iniciando servidor http")
const server = http.createServer(app)
    .listen(port, () => {
        console.log(`enviroment: ${process.env.APP_ENV}`)
        console.log(`estamos online na porta  ${port}`)
    })

// }