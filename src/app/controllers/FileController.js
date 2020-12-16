import File from '../models/File'

class FileController {
   async store (req, res) {

      const {originalname: name, filename: path} = req.file

      const  imgId = await File.create({name, path})
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
      return res.json({imgId})
   }
}

export default new FileController()