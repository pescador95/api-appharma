import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string().email(),
         oldPassword: Yup.string().min(6),
         whatsapp: Yup.string().min(6),
         password: Yup.string()
            .min(6)
            .when('oldPassword', (old, field) =>
               old ? field.required() : field
            ),
         confirmPassword: Yup.string()
            .when('password', (pass, field) =>
               pass ? field.required().oneOf([Yup.ref('password')]) : field
            )

      })

      await schema.validate(req.body, { abortEarly: false })

      return next()


   } catch (err) {
      return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

   }
}