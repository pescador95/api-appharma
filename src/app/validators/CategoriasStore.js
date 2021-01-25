import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         descricao:Yup.string().required(),
         id_img:Yup.number()
      })

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(400).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}