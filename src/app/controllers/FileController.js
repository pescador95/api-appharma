import File from '../models/File'

class FileController {
    async store(req, res) {
        if (!req.userAdmin){
            return res.json({error:"Você não é administrador."})
         }
        const { originalname: name, filename: path } = req.file

        console.log(`filename: ${path} original name: ${name}`)

        try{
            const imgId = await File.create({ name, path })
            return res.json({ imgId })

        } catch(e){
            console.log(JSON.stringify(e))
            return res.json({error:e.message})
        }

        
    }
}

export default new FileController()