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
import AddressController from './app/controllers/AddressController'
import VendaController from './app/controllers/VendaController'
import FcmController from './app/controllers/FcmController'
import MensagemController from './app/controllers/MensagemController'
import EstoqueController from './app/controllers/EstoqueController'
import SyncController from './app/controllers/SyncController'
import ReservaController from './app/controllers/ReservaController'


import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateProdutoStore from './app/validators/ProdutoStore'
import validateSessaoStore from './app/validators/SessaoStore'
import validadeSessions from './app/validators/SessionStore'
import validateSubcategoriasStore from './app/validators/SubcategoriaStore'
import validateCategorias from './app/validators/CategoriasStore'
import validateReserva from './app/validators/ReservaStore'
import {store as vendaValidatorStore, update as vendaValidatorUpdate} from './app/validators/VendaValidator'
import {update as addressValidatorUpdate, store as addressValidatorStore} from './app/validators/AddressUpdate'


import Auth from './app/middlewares/Auth'
import multerConfig from './config/multer'
import multer from 'multer'
const routes = new Router()
const upload = multer(multerConfig)


routes.get('/api/ping', async (req, res)=>{
    
    res.json({ping:"Ping pong... Api funcionando, integração continua tambem!"})
})

//Testa ultima sincronização
routes.get('/api/sync/:id', SyncController.show);

routes.post('/api/fcm', FcmController.store)

routes.post('/api/sessions', validadeSessions, SessionController.create)
routes.post('/api/usuarios', validateUserStore, UserController.store)


routes.get('/api/produtos', ProdutoController.show)
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

//grava no FCM_TOKEN quando aquele token entrou pela ultima vez
routes.post('/api/lastacess', FcmController.utlimoAcesso)

//CONTOLE DE RESERVAS
routes.get('/api/reserva/:id_produto', ReservaController.show ) 
routes.post('/api/reserva', validateReserva, ReservaController.store)


routes.use(Auth)

//Criar novo tipo de marcação de sincronização
routes.post('/api/sync', SyncController.store);

//BAIXAR RESERVA
routes.put('/api/reserva/:chave_venda', ReservaController.baixar)


//testar token
routes.get('/api/token/acme/', async (req, res) => {
    console.log("Testando token..")
    return res.json({sucesso:"sucesso"})
})


//ATUALIZAÇÃO DE ESTOQUE
routes.put('/api/estoque/:idloja/:idproduto', EstoqueController.update)
// INSERINDO ESTOQUE NOVO
routes.post('/api/estoque', EstoqueController.store)

//ATUALIZANDO SYNCRONIZAÇÃO
routes.put('/api/sync/:idmark', SyncController.update)
//MOSTRAR ESTOQUE
routes.get('/api/estoque/:idloja/:idproduto', EstoqueController.show);




routes.post('/api/sendmessage/:iduser/:idmsg', FcmController.sendMessage);
routes.put('/api/fcm', FcmController.update)

routes.post('/api/param/mensagens', MensagemController.store)
routes.put('/api/param/mensagens/:id', MensagemController.update)
routes.get('/api/param/mensagens/:id', MensagemController.index)
routes.get('/api/param/mensagens', MensagemController.show)


routes.post('/api/categorias', validateCategorias, CategoriaController.store)
routes.put('/api/categorias', CategoriaController.update)

routes.post('/api/subcategorias', validateSubcategoriasStore, SubCategorias.store)
routes.post('/api/tipo-produto', validateCategorias, TipoController.store)

routes.get('/api/promocoes/direct',  PromocaoController.bestSellers)

routes.put('/api/usuarios', validateUserUpdate, UserController.update)

routes.post('/api/produtos/rep', validateProdutoStore, ProdutoController.addReplicador)
routes.post('/api/produtos', validateProdutoStore, ProdutoController.store)
routes.put('/api/produtos',  ProdutoController.update)

routes.post('/api/files', upload.single('file'), FileController.store)

routes.post('/api/sessao', validateSessaoStore, SessaoController.store)

routes.post('/api/endereco', addressValidatorStore, AddressController.store)
routes.put('/api/endereco/:id', addressValidatorUpdate,  AddressController.update)
routes.delete('/api/endereco/:id', AddressController.delete)
routes.get('/api/endereco/', AddressController.show)

routes.post('/api/venda/', VendaController.store )
routes.put('/api/venda/', vendaValidatorUpdate, VendaController.update )
routes.get('/api/venda/', VendaController.show )
routes.get('/api/venda/:codvenda', VendaController.showItems)


export default routes