import File from '../models/File'

class FileController {
    async store(req, res) {
        if (!req.userAdmin){
            return res.json({error:"Você não é administrador."})
         }
        const { originalname: name, filename: path } = req.file

        const imgId = await File.create({ name, path })
        return res.json({ imgId })
    }
}

export default new FileController()