import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         nome:Yup.string().required(),
         descricao:Yup.string(),
         id_grupo:Yup.number(),
         id_sessao:Yup.number(),
         principio: Yup.string(),
         codigo_produto: Yup.number(),
         codigo_barras: Yup.string()
      })


      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}