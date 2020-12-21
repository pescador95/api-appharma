import * as Yup from 'yup'

export default async (req, res, next) => {
   try {
      const schema = Yup.object().shape({
         chave_venda:Yup.string().required(),
         id_produto:Yup.number().required(),
         id_estoque:Yup.number().required(),
         qtd_reserva: Yup.number().required()
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