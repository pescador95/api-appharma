import * as Yup from 'yup'

export default async (req, res, next) =>{
   try{
      const schema = Yup.object().shape({
         cpf:Yup.string().required(),
         name:Yup.string().required(),
         email:Yup.string().email(),
         whatsapp:Yup.string().min(11),
         password:Yup.string().min(6).required(),
         confirmPassword:Yup
                                          .string()
                                          .when('password', (pass, field) => pass ? field.required().oneOf([Yup.ref('password')]):field)
      })


      await schema.validate(req.body, {abortEarly: false})

      return next()

      
   }catch (err){
      return res.status(401).json({error:"Parâmetros invalidos", messages: err.inner})
      
   }
}