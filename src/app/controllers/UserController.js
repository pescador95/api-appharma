import User from '../models/User'
import * as Yup from 'yup'

class UserController {

   async index(req, res){
      const { cpf } = req.params;

      const exists = await User.findOne({where:{cpf}})
      if (!exists){
         return res.status(40).json({error:"Usuario não existe"})
      }

      return res.status(200).json(exists)

   }

   async store(req, res){

      const { cpf } = req.body 

      const exists = await User.findOne({where:{cpf}})
      
      if (exists){
         return res.status(401).json({error:"Usuario já existe"})
      }

      const { id, name } = await User.create(req.body)

      return res.status(201).json({
         id,
         cpf,
         name,
         msg:"success"
      } )

   }

   async update(req, res){

      const {email, password, oldpassword, name} = req.body
      const id = req.userId
      const user = await User.findByPk(id)

      if(!user){
         return res.status(400).json({error:"Não autorizado"})
      }

      if (email && email !== user.email){
         const exist = await User.findOne({where: {email}})
         if (exist){
            return res.status(400).json({error:"Usuario ja existe"})
         }
      }

      if(password){
         if(!oldpassword){
            return res.status(401).json({error:"Senha antiga não confere"})
         }
         if(!(await user.checkPassword(oldpassword))){
            return res.status(401).json({error:"Senha antiga não confere"})
         }
      }

      const updated = await user.update(req.body)
      return res.json({updated})
   }

}
export default new UserController();