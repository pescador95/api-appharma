import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User'
import File from '../app/models/File'
import Produto from '../app/models/Produto'
import Sessao from '../app/models/Sessao'
import Grupo from '../app/models/Grupo'
import Promocao from '../app/models/Promocao'
import Cliente from '../app/models/Cliente'
import Venda from '../app/models/Venda'
import Estoque from '../app/models/Estoque'
import Tipo from '../app/models/Tipo'
import Categoria from '../app/models/Categoria'
import SubCategoria from '../app/models/SubCategoria'
import UserAddress from '../app/models/UserAddress' 
import Fcm from '../app/models/Fcm'
import Mensagem from '../app/models/Mensagem'
import Loja from '../app/models/Loja'
import Sync from '../app/models/Sincronizacao'
import Reserva from '../app/models/Reserva'
import ProdutoSubcategorias from '../app/models/ProdutoSubcategorias'
import Principio from '../app/models/PrincipioAtivo'

const models = [User, File, Produto, Grupo, Sessao, Promocao, Cliente, Venda, Estoque, Tipo, Categoria, SubCategoria, UserAddress, Fcm, Mensagem, Loja, Sync, Reserva, ProdutoSubcategorias, Principio  ];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
