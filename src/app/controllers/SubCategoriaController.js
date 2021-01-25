import SubCategoria from '../models/SubCategoria'

class SubCategoriaController {
    async store(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const { id_categoria, descricao } = req.body

        const sub = await SubCategoria.create({ id_categoria, descricao })

        if (!sub) {
            return res.status(400).json({ error: "Ocorreu um erro ao inserir a subcategoria" })
        }

        const { id } = sub

        return res.json({ id, id_categoria, descricao })
    }

    async show(req, res) {

        const { id_categoria } = req.params

        const sub = await SubCategoria.findAll({where:{id_categoria}})

        if (!sub) {
            return res.status(400).json({ error: "Ocorreu um erro ao inserir a subcategoria" })
        }

        return res.json(sub)

    }
}

export default new SubCategoriaController()