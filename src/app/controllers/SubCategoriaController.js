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

        const sub = await SubCategoria.findAll({ where: { id_categoria } })

        if (!sub) {
            return res.status(400).json({ error: "Ocorreu um erro ao inserir a subcategoria" })
        }

        return res.json(sub)

    }

    async update(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const { id } = req.params
        const { descricao } = req.body

        const cat = await SubCategoria.findOne({ where: { id } })

        if (!cat) {
            console.log("Não achei subcategoria id: " + id)
            return res.status(200).json({ error: "Não encontrei essa subcategoria" })
        }

        const resp = await cat.update({ descricao })

        return res.status(200).json(resp)

    }

    async delete(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const { id } = req.params
        const sql = ' delete from subcategorias where id = :id'

        try {
            const resp = await SubCategoria.sequelize.query(sql, {
                replacements: {
                    id
                }
            })

            return res.status(200).json(resp)

        } catch (e) {
            console.log(JSON.stringify(e))

        }

    }
}

export default new SubCategoriaController()