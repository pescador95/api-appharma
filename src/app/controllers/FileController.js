import File from '../models/File'

class FileController {
    async store(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const { originalname: name, filename: path } = req.file

        const imgId = await File.create({ name, path })
        return res.json({ imgId })
    }
}

export default new FileController()