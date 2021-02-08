import Categoria from '../models/Categoria'
import Service from '../services/CategoriaService'
import File from '../models/File'

class CategoriaController {
    async store(req, res) {

        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        console.log("Vou inserir a categorai..")
        const { descricao, id_img } = req.body

        const categoria = await Categoria.create({ descricao, id_img })

        if (!categoria) {
            return res.status(400).json({ error: "Ocorreu um erro ao inserir a categoria" })
        }

        const { id } = categoria

        return res.json({ id, descricao, id_img })
    }

    async update(req, res) {

        if (!req.userAdmin) {
            return res.status(401).json({ error: "permitido apenas para administradores" })
        }
        try {
            const categoria = await Service.CategoriaExiste({ idCategoria: req.query.id })

            categoria.update(req.body)

            res.json(categoria)
        } catch (e) {
            res.status(400).json({ error: e.message })
        }
    }

    async show(req, res) {

        const categorias = await Categoria.findAll({
            include: [
                {
                    model: File,
                    as: "image",
                    attributes: ['name', 'path', 'url']
                }
            ],
            attributes: ['id', 'descricao']
        })

        if (!categorias) {
            res.status(400).json({ error: "não existem categorias" })
        }

        res.json(categorias)

    }

    async delete(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }
        const { id } = req.params;
        let sql = "delete from subcategorias where id_categoria = :id";
        try{
            await Categoria.sequelize.query(sql, {
                replacements: {
                    id
                }
            })
            sql = "delete from categorias where id = :id";
            await Categoria.sequelize.query(sql, {
                replacements:{
                    id
                }
            })

            return res.status(200).json({success: "OK"})

        }catch (e) {
            console.log(JSON.stringify(e))
            return res.status(500).json({error: e.message})

        }
    }
}

export default new CategoriaController()