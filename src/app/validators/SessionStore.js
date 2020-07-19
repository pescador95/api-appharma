import * as Yup from 'yup'

export default async (req, res, next) =>{
   try{
      const schema = Yup.object().shape({
         cpf:Yup.string().required(),
         email:Yup.string().email(),
         password:Yup.string().min(6).required()
      })


      await schema.validate(req.body, {abortEarly: false})

      return next()

      
   }catch (err){
      return res.status(401).json({error:"Parâmetros invalidos", messages: err.inner})
      
   }
}