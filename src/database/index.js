import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/User'
import File from '../app/models/File'
import Produto from '../app/models/Produto'
import Sessao from '../app/models/Sessao'
import Grupo from '../app/models/Grupo'

const models = [User, File, Produto, Grupo, Sessao];

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
