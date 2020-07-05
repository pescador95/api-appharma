import User from '../models/User'
import * as Yup from 'yup'

class UserController {

   async store(req, res){

      const schema = Yup.object().shape({
         name:Yup.string().required(),
         email:Yup.string().email().required(),
         password:Yup.string().min(6).required(),
         confirmPassword:Yup
                                          .string()
                                          .when('password', (pass, field) => pass ? field.required().oneOf([Yup.ref('password')]):field)
      })

      if(!(await schema.isValid(req.body))){
         return res.status(401).json({error:"Parâmetros invalidos"})

      }
      const { email } = req.body 

      const exists = await User.findOne({where:{email}})
      
      if (exists){
         return res.status(401).json({error:"Usuario já existe"})
      }

      const { id, name } = await User.create(req.body)

      return res.status(201).json({
         id,
         name,
         email,
         msg:"success"
      } )

   }

   async update(req, res){

      const schema = Yup.object().shape({
         name:Yup.string(),
         email:Yup.string().email(),
         oldPassword:Yup.string().min(6),
         password:Yup.string()   
                                  .min(6)
                                  .when('oldPassword', (old, field) =>
                                     old ? field.required() : field
                                  ),
         confirmPassword:Yup.string()
                               .when('password', (pass, field) =>
                                  pass ? field.required().oneOf([Yup.ref('password')]):field
                               )

      })

      const formValid = await schema.isValid(req.body)

      console.log(formValid)

      if (!(formValid)) {
         return res.status(400).json({ error: "Invalid params" })
      }

      const {email, password, oldpassword, name} = req.body
      const id = req.userId
      const user = await User.findByPk(id)

      if(!user){
         return res.status(400).json({error:"Não autorizado"})
      }

      if (email !== user.email){
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