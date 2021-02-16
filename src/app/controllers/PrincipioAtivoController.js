import PrincipioAtivo from '../models/PrincipioAtivo'
import {QueryTypes} from 'sequelize'

class Principio {


    async show(req, res) {
        try {
            const prin = await PrincipioAtivo.findAll({
                order: [['id']]
            });
            if (!prin) {
                return res.status(200).json({ error: "Não encontrei principio ativo cadastrado" })
            }
            return res.status(200).json(prin)
        } catch (e) {
            console.log(e.message)
        }
    }


    async store(req, res) {
        const { id, principio } = req.body
        try {

            const sql = `insert into principio_ativo (id, principio, created_at, updated_at) 
                          values (:id, :principio, now(), now()) 
         `

            const prin = await PrincipioAtivo.sequelize.query(sql, {
                type:QueryTypes.INSERT,
                replacements:{
                    id,
                    principio
                }
            })
            if (!prin) {
                return res.status(200).json({ error: "Não pude criar esse principio ativo" })
            }
            return res.status(201).json({ success: "principio inserido com sucesso" })
        } catch (e) {
            console.log(e.message)
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { principio } = req.body
        try {
            const prin = await PrincipioAtivo.findOne({ where: { id } })
            if (!prin) {
                return res.status(200).json({ error: "Não encontrei esse principio para alterar" })
            }
            await prin.update({ principio })
            return res.status(200).json({ success: "principio alterado com sucesso" })
        } catch (e) {
            console.log(e.message)
        }
    }

}

export default new Principio()