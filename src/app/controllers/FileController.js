import File from '../models/File'
import {QueryTypes} from 'sequelize'

class FileController {
    async store(req, res) {
        if (!req.userAdmin){
            return res.json({error:"Você não é administrador."})
         }
        const { originalname: name, filename: path } = req.file


        try{  
            
            const slqId = 'select max(id) + 1 as id from files';

            const filesId = await File.sequelize.query(slqId, {
                type:QueryTypes.SELECT
            })
            
            const sql = `insert into files (id, name, path, created_at, updated_at) values (:id, :name, :path, now(), now()) `;

            const imgId = await File.sequelize.query(sql, {
                type:QueryTypes.INSERT,
                replacements:{
                    id:filesId[0].id,
                    path,
                    name
                }
            })
            // const imgId = await File.create({ name, path })
            return res.json({  imgId:filesId[0].id, URL:path })

        } catch(e){
            console.log(JSON.stringify(e))
            return res.json({error:e.message})
        }

        
    }
}

export default new FileController()