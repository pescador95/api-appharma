import 'dotenv/config'

import cors from 'cors'
import Youch from 'youch'
import express from 'express'
import { resolve } from 'path'

import routes from './routes'

import './database'

class App {
   constructor() {
      this.server = express()

      this.middlewares()
      this.routes()
      this.exceptionHandler()
   }

   middlewares() {

      this.server.use(cors({
          allowedHeaders:"Content/Type",
         origin: "*",
         "methods": "GET,HEAD,PUT,POST,DELETE",
         "preflightContinue": false,
         "optionsSuccessStatus": 204
       }));
      this.server.use(express.json());
      this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))
   }

   routes() {
      this.server.use(routes)
   }

   exceptionHandler() {
      this.server.use(async (err, req, res, next) => {
         let errors;
         errors = await new Youch(err, req).toJSON()

         if (process.env.APP_ENV === 'development') {
            return res.status(500).json(errors)
         }
         return res.status(500).json({ error: 'Internal server error', msg: errors.error.message })

      })
   }
}

export default new App().server