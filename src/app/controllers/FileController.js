import File from '../models/File'

class FileController {
    async store(req, res) {
        res.header("Content-Type");
        const { originalname: name, filename: path } = req.file

        const imgId = await File.create({ name, path })
        return res.json({ imgId })
    }
}

export default new FileController()