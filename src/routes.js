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
import LojaController from './app/controllers/LojaController'
import GraficoController from './app/controllers/GraficoController'


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
import validatePromo from './app/validators/PromoStoreValidator'
import {validate as lojasValidator} from './app/validators/LojaValidate'
import produtoPutValidator from './app/validators/ProdutoPutValidate'


import Auth from './app/middlewares/Auth'
import multerConfig from './config/multer'
import multer from 'multer'

const routes = new Router()
const upload = multer(multerConfig)


routes.get('/api/sync/valida', SyncController.validaSync)
routes.get('/api/ping', async (req, res)=>{
 
    res.json({ping:"Ping pong...  funcionando!"})
})


routes.get('/api/loja/prazo', LojaController.prazoEntrega)

//Testa ultima sincronização
routes.get('/api/sync/:id', SyncController.show);

//Pega configurações da loja
routes.get('/api/loja', LojaController.show)

routes.post('/api/fcm', FcmController.store)

routes.post('/api/sessions', validadeSessions, SessionController.create)
routes.post('/api/usuarios', validateUserStore, UserController.store)


routes.get('/api/produtos', ProdutoController.show)
routes.get('/api/produtos/consulta', ProdutoController.selectProduct);
routes.get('/api/produtos/best-sellers', ProdutoController.topSellers)
routes.get('/api/produtos/similars', ProdutoController.similars)
routes.get('/api/produtos/search', ProdutoController.search)

//PESQUISA PRODUTOS POR SUBCATEGORIA
routes.get('/api/produtos/subcategorias', ProdutoController.produtosByCategoria)


routes.get('/api/produtos/:barra', ProdutoController.index)
routes.get('/api/promocoes',  PromocaoController.show)
routes.get('/api/promocoes/best',  PromocaoController.bestSellers)
routes.get('/api/promocoes/destaques', PromocaoController.destaques)


routes.get('/api/usuarios/:cpf', UserController.index)
routes.get('/api/clientes/:cpf', ClienteController.index)


//CATEGORIAS
routes.get('/api/categorias', CategoriaController.show)
routes.get('/api/subcategorias/:id_categoria', SubCategorias.show)


//grava no FCM_TOKEN quando aquele token entrou pela ultima vez
routes.post('/api/lastacess', FcmController.utlimoAcesso)

//CONTOLE DE RESERVAS
routes.post('/api/verify/reserva', ReservaController.verifyCart)
routes.get('/api/reserva/:id_produto', ReservaController.show ) 
routes.post('/api/reserva', validateReserva, ReservaController.store)

routes.get('/api/loja/:id', LojaController.index)



routes.use(Auth)

//Rotas para chamar graficos
routes.get('/api/grafico/vendas', GraficoController.graficoVendas)

//Criar novo tipo de marcação de sincronização
routes.post('/api/sync', SyncController.store);

//BAIXAR RESERVA
routes.put('/api/reserva/:chave_venda', ReservaController.baixar)
routes.put('/api/reserva/cancelar/:chave_venda', ReservaController.cancelar)


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



routes.post('/api/sendmessage/all', FcmController.sendMessage);

routes.post('/api/sendmessage/:iduser/:idmsg', FcmController.sendMessage);
routes.put('/api/fcm', FcmController.update)

routes.post('/api/param/mensagens', MensagemController.store)
routes.put('/api/param/mensagens/:id', MensagemController.update)
routes.get('/api/param/mensagens/:id', MensagemController.index)
routes.get('/api/param/mensagens', MensagemController.show)

//CATEGOIRAS
routes.post('/api/categorias', validateCategorias, CategoriaController.store)
routes.put('/api/categorias', CategoriaController.update)
routes.delete('/api/categorias/:id', CategoriaController.delete)

//SUBCATEGORIAS
routes.post('/api/subcategorias', validateSubcategoriasStore, SubCategorias.store)
routes.put('/api/subcategorias/:id',  SubCategorias.update)
routes.delete('/api/subcategorias/:id',  SubCategorias.delete)

//TIPO PRODUTO
routes.post('/api/tipo-produto', validateCategorias, TipoController.store)

//PROMOÇOES
routes.get('/api/promocoes/direct',  PromocaoController.bestSellers)
routes.post('/api/promocoes', validatePromo, PromocaoController.store)
routes.put('/api/promocoes/:codigo', PromocaoController.update)

routes.put('/api/usuarios', validateUserUpdate, UserController.update)

routes.post('/api/produtos', validateProdutoStore, ProdutoController.store)
routes.post('/api/produtos/add', ProdutoController.addProdutoSync)
routes.put('/api/produtos/:id', produtoPutValidator, ProdutoController.update)
// UPDATE NO RETAGUARDA
routes.put('/api/ret/produtos/:id',  ProdutoController.updateRetaguarda)

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

routes.post('/api/loja', lojasValidator, LojaController.store)
routes.put('/api/loja/:id', lojasValidator, LojaController.update);



export default routes