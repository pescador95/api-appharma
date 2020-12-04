import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         nome:Yup.string().required(),
         descricao:Yup.string(),
         id_grupo:Yup.number(),
         id_sessao:Yup.number(),
         fabricante: Yup.string(),
         codigo_produto: Yup.number(),
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