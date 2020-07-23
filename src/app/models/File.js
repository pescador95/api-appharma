import 'dotenv/config'
import Sequelize, { Model } from 'sequelize'

class File extends Model {
   static init(sequelize) { 
      super.init({
         name: Sequelize.STRING,
         path: Sequelize.STRING,
         url: {
            type: Sequelize.VIRTUAL,
            get() {
               return `${process.env.app_url?process.env.app_url:'https://ioffertas.club:3333'}/files/${this.path}`
            }
         }
      },
         {
            sequelize
         })

      return this;
   }

}

export default File;