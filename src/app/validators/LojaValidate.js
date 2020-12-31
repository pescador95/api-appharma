import * as Yup from 'yup'

export const validate = async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         cnpj: Yup.string(),
         descricao: Yup.string(),
         whatsapp: Yup.string().min(11),
         taxa_entrega: Yup.number(),
         prazo_entrega: Yup.number()
      })

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(400).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}