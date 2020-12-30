import * as Yup from 'yup'

export const update = async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         cep: Yup.string(),
         rua: Yup.string(),
         numero: Yup.string(),
         complemento: Yup.string(),
         bairro: Yup.string(),
         cidade: Yup.string(),
         uf: Yup.string(),
      })

    //   if (!(await schema.isValid(req.body))) {
    //      return res.status(400).json({ error: 'invalid params' })
    //   }

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(400).json({ error: "Parâmetros invalidos", messages: err.inner })

   }

}

export const store = async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         cep: Yup.string(),
         rua: Yup.string().required(),
         numero: Yup.string().required(),
         complemento: Yup.string(),
         bairro: Yup.string().required(),
         cidade: Yup.string().required(),
         uf: Yup.string().required(),
      })

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'invalid params' })
      }

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}