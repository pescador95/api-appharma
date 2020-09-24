import * as Yup from 'yup'

export const update = async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         codigo_venda: Yup.string().required(),
         usuario_alteracao: Yup.string().required(),
         status: Yup.string().required().oneOf(['Pendente', 'Confirmado', 'Enviado', 'Finalizado', 'Cancelado'])
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

export const store = async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         levar_pinpad: Yup.boolean().required(),
         troco_para: Yup.number(),
         tipo_venda: Yup.string().required(),
         tipo_entrega: Yup.string().required(),
         id_endereco: Yup.number()
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