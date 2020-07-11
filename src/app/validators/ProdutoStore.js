import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         nome:Yup.string().required(),
         descricao:Yup.string().required(),
         valor_custo:Yup.number().required(),
         valor_venda:Yup.number()
         .required()
      })

      if (!(await schema.isValid(req.body))){
         return res.status(400).json({error:'invalid params'})
      }

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}