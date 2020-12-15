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
               return `${process.env.APP_URL?process.env.APP_URL:'https://approachmobile.company'}/files/${this.path}`
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