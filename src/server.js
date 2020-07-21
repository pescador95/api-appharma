import app from './app'
const { resolve } = require('path');
const https = require('https')
const http = require('http')
import fs from 'fs'
const port = 3333;

const options = {
   key: fs.readFileSync(resolve(__dirname, 'config', 'privkey.pem'), 'utf-8'),
   cert: fs.readFileSync(resolve(__dirname, 'config', 'fullchain.pem'), 'utf-8')
}

https.createServer(options, app)
    .listen(port, () => {
        console.log(`enviroment: ${process.env.APP_ENV}`)
        console.log(`estamos online na porta  ${port}`)
    })

// http.createServer(app)
//     .listen(port, () => {
//         console.log(`enviroment: ${process.env.APP_ENV}`)
//         console.log(`estamos online na porta  ${port}`)
//     })
