import File from '../models/File'

class FileController {
    async store(req, res) {
        console.log("Entrei no file controler pelo menos...")
        const { originalname: name, filename: path } = req.file

        const imgId = await File.create({ name, path })
        return res.json({ imgId })
    }
}

export default new FileController()