import {Router} from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionCrontroller'
import ProdutoController from './app/controllers/ProdutoController'
import FileController from './app/controllers/FileController'
import SessaoController from './app/controllers/SessaoController'
import PromocaoController from './app/controllers/PromocaoController'
import ClienteController from './app/controllers/ClienteController'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateProdutoStore from './app/validators/ProdutoStore'
import validateSessaoStore from './app/validators/SessaoStore'
import validadeSessions from './app/validators/SessionStore'

import Auth from './app/middlewares/Auth'
import multerConfig from './config/multer'
import multer from 'multer'
const routes = new Router()
const upload = multer(multerConfig)

routes.get('/api/ping', async (req, res)=>{

   res.json({ping:"pong"})
})

routes.post('/api/sessions', validadeSessions, SessionController.create)
routes.post('/api/usuarios', validateUserStore, UserController.store)
routes.get('/api/produtos', ProdutoController.show)
routes.get('/api/produtos/:barra', ProdutoController.index)
routes.get('/api/promocoes',  PromocaoController.show)
routes.get('/api/promocoes/shame',  PromocaoController.shameSellers)

routes.get('/api/usuarios/:cpf', UserController.index)
routes.get('/api/clientes/:cpf', ClienteController.index)

routes.use(Auth)

routes.put('/api/usuarios', validateUserUpdate, UserController.update)

routes.post('/api/produtos', validateProdutoStore, ProdutoController.store)
routes.put('/api/produtos',  ProdutoController.update)

routes.post('/api/files', upload.single('file'), FileController.store)

routes.post('/api/sessao', validateSessaoStore, SessaoController.store)


export default routes