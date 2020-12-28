import Sync from '../models/Sincronizacao'
const { Op, QueryTypes} = require("sequelize");

class SyncController {

    async show(req, res) {
        const {id} = req.params;
        try {
            const sync = await Sync.findByPk(id);
            
            if (!sync) {
                return res.status(400).json({ error: "Não existe sincronização" })
            }

            return res.json(sync)

        } catch (e) {
            console.log(e.message)
        }
    }

    async store(req, res) {
        try {
            if (!req.userAdmin){
                return res.json({error:"Você não é administrador."})
             }
            const { descricao } = req.body
            console.log(JSON.stringify(req.body))
            const agora =  new Date();
            const sync = await Sync.create({ descricao, horario: agora});
            if (!sync) {
                return res.status(400).json({ error: "Não pude criar essa marcação" })
            }
            const { id } = sync;
            return res.status(201).json({ success: "Nova marcação criada", sync: { id,  horario:agora } })
        } catch (e) {
            console.log(e.message)
        }
    }

    async update(req, res) {
        try {
            if (!req.userAdmin){
                return res.json({error:"Você não é administrador."})
             }
            const agora = new Date();
            const {idmark} = req.params;
            const sync = await Sync.findByPk(idmark);
            if (!sync) {
                return res.status(400).json({ error: "Não encontrei marcação para esse id!" })
            }
            const updated = await sync.update({ horario:agora })
            return res.status(200).json({ success: "Atualizado com sucesso", updated})
        } catch (e) {
            console.log(e.message)
        }
    }

    async validaSync(req, res){
        const sql = ` select 
        case 
          when (interval '5 minutes' + now()) > horario then 1
          else 0 
          end as desync from sincronizacao
        where id = 1
        `

        const resp = await Sync.sequelize.query(sql, {
            type:QueryTypes.SELECT
        })

        if (!resp){
            return res.status(400).json({error:"Não consegui validar marcacao"})
        }

        return res.status(200).json(resp)

    }

}

export default new SyncController()