import File from '../models/File'

class FileController {
    async store(req, res) {
        
        const { originalname: name, filename: path } = req.file

        const imgId = await File.create({ name, path })
        res.set('Content-Type', 'multipart/form-data')
        res.set('Access-Control-Allow-Origin', '*')
        return res.json({ imgId })
    }
}

export default new FileController()