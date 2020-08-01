import 'dotenv/config'

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

      this.server.use(express.json());
      this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))
   }

   routes() {
      this.server.use(routes)
   }

   exceptionHandler() {
      this.server.use(async (err, req, res, next) => {
         let errors;
         if (process.env.APP_ENV === 'development') {
            errors = await new Youch(err, req).toJSON()
            return res.status(500).json({error:'Internal server error',msg:errors.error.message})
         }

         return res.status(500).json({ error: 'Internal server error', msg:errors.error.message })
      })
   }
}

export default new App().server