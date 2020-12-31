import * as Yup from 'yup'

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            codigo: Yup.number().required(),
            nome: Yup.string().required(),
            descricao: Yup.string().default(''),
            data_inicio: Yup.date().required(),
            data_fim:Yup.date().required(),
            preco_promocao:Yup.number().required(),
            codigo_barras:Yup.string(),
            avista:Yup.number().default(0),
            prazo:Yup.number().default(0),
            cheque:Yup.number().default(0),
            cartao:Yup.number().default(0),
            id_produto:Yup.number().required()
      })

        await schema.validate(req.body, { abortEarly: false })

        return next()


    } catch (err) {
        return res.status(401).json({ error: "Parâmetros invalidos", messages: err.inner })

    }
}