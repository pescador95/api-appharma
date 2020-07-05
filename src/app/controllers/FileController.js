import File from '../models/File'

class FileController {
   async store(req, res){
      const teste ={
         name:"Fuck",
         path:"fuck"
      }
      await File.create(teste)
   }
}

export default new FileController()