import User from '../models/User'
import jwt from 'jsonwebtoken'

class Session {

   async create(req, res){
      
      const {cpf, password} = req.body;

      const user = await User.findOne({where:{cpf}})

      if(!user){
         return res.status(401).json({error:"Usuário/Senha invalidos"})
      }

      if(!(await user.checkPassword(password))){
         return res.status(401).json({error:"Usuário/Senha invalidos"})
      }
      const {id, name, admin} = user;

      const token = jwt.sign({id, name, admin}, process.env.SECRET, {expiresIn:'7d'})

      res.json({session:{success:"created", id, name, admin},token:token})

   }

}
export default new Session()