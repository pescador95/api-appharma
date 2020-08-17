import {Router} from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionCrontroller'
import ProdutoController from './app/controllers/ProdutoController'
import FileController from './app/controllers/FileController'
import SessaoController from './app/controllers/SessaoController'
import PromocaoController from './app/controllers/PromocaoController'
import ClienteController from './app/controllers/ClienteController'
import CategoriaController from './app/controllers/CategoriaController'
import SubCategorias from './app/controllers/SubCategoriaController'
import TipoController from './app/controllers/TipoController'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateProdutoStore from './app/validators/ProdutoStore'
import validateSessaoStore from './app/validators/SessaoStore'
import validadeSessions from './app/validators/SessionStore'
import validateSubcategoriasStore from './app/validators/SubcategoriaStore'
import validateCategorias from './app/validators/CategoriasStore'

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
routes.get('/api/produtos/consulta', ProdutoController.selectProduct);
routes.get('/api/produtos/best-sellers', ProdutoController.topSellers)
routes.get('/api/produtos/similars', ProdutoController.similars)
routes.get('/api/produtos/search', ProdutoController.search)

routes.get('/api/produtos/:barra', ProdutoController.index)
routes.get('/api/promocoes',  PromocaoController.show)
routes.get('/api/promocoes/best',  PromocaoController.bestSellers)


routes.get('/api/usuarios/:cpf', UserController.index)
routes.get('/api/clientes/:cpf', ClienteController.index)
routes.get('/api/categorias', CategoriaController.show)


routes.use(Auth)

routes.post('/api/categorias', validateCategorias, CategoriaController.store)
routes.put('/api/categorias', CategoriaController.update)

routes.post('/api/subcategorias', validateSubcategoriasStore, SubCategorias.store)
routes.post('/api/tipo-produto', validateCategorias, TipoController.store)

routes.get('/api/promocoes/direct',  PromocaoController.directSell)

routes.put('/api/usuarios', validateUserUpdate, UserController.update)

routes.post('/api/produtos', validateProdutoStore, ProdutoController.store)
routes.put('/api/produtos',  ProdutoController.update)

routes.post('/api/files', upload.single('file'), FileController.store)

routes.post('/api/sessao', validateSessaoStore, SessaoController.store)


export default routes