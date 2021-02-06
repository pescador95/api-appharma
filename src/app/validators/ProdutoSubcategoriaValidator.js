import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         id_subcategoria:Yup.number().required(),
         id_produto:Yup.number().required(),
      })

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}