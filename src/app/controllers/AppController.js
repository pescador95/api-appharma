import App from '../models/App'
import {QueryTypes} from 'sequelize'

class AppController {

   async show(req, res){

      const sql = `select id, version 
                        from app
                    order by id desc
                    limit 1`
      try{
         const appInfo = await App.sequelize.query(sql, {
             type: QueryTypes.SELECT
         })
   
         if(!appInfo){
            return res.status(400).json({error:"Não encontrei versões"})
         }
   
         return res.json(appInfo)

      }catch(e){  
         console.log(e.message)
      }
   }

   async store(req, res){
      const superAdmn = req.superAdmin;
      const {version} = req.body;

      if (!superAdmn) {
          return res.status(200).json({error:"Sem permissão"})
      }

      try{
         const appVersion = await App.create({version});
         if(!appVersion){
            return res.status(400).json({error:"Não pude criar essa versão"})
         }
         const {id} = appVersion;
         return res.status(201).json({success:"Nova versão criada", App:{id, version}}) 
      }catch (e){
         console.log(e.message)
      }
   }

   
}

export default new AppController()