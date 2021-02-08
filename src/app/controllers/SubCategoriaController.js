import SubCategoria from '../models/SubCategoria'
import {QueryTypes} from 'sequelize'


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

        const sql = `select s.id, c.id as id_categoria, c.descricao as categorias, s.descricao  from subcategorias as s
                                left join categorias as c on c.id = s.id_categoria
                            where id_categoria = :id`

        const sub = await SubCategoria.sequelize.query(sql, {
            type:QueryTypes.SELECT,
            replacements:{
                id:id_categoria
            }
        })

        if (!sub) {
            return res.status(400).json({ error: "Não existe subcategorias." })
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

    async ProdutoSubcategorias(req, res){
        
        const {id, tipo} = req.query
        

        let sql = `SELECT distinct sub.id as id, sub.descricao as content
        from subcategorias sub
        left join produto_subcategorias ps on ps.id_subcategoria = sub.id
        `
        try {
            if (tipo === 'free') {
                sql = sql + " where id_produto <> :id" 
            } else {
                sql = sql + " where id_produto = :id"
            }

            console.log("esse é  o SQL: "+ sql)
    
            const resp = await SubCategoria.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements:{
                    id
                }
            })

            console.log(JSON.stringify(resp))
    
            if (!resp) {
                return res.status(200).json({error:"Não encontrei subcategorias"})
            }

            return res.status(200).json(resp)

        } catch (e){
            console.log(JSON.stringify(e))
            return res.status(500).json({error:e})
        }



    }
}

export default new SubCategoriaController()