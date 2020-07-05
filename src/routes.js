import {Router} from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionCrontroller'
import FileController from './app/controllers/FileController'

import Auth from './app/middlewares/Auth'

const routes = new Router();

routes.get('/api/ping', (req, res)=>res.json({ping:"pong"}))
routes.post('/api/sessions', SessionController.create)
routes.post('/api/usuarios', UserController.store)

routes.use(Auth)

routes.put('/api/usuarios', UserController.update)




export default routes;