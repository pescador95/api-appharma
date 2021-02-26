import Sequelize, { Model } from 'sequelize'

class App extends Model {
   static init(sequelize) {
      super.init({
         version:Sequelize.STRING,
      },
      {
         sequelize,
         tableName:'app'
      })

      return this;
   }



}

export default App;