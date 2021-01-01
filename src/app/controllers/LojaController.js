import Loja from '../models/Loja'
import { QueryTypes } from 'sequelize'
import { format, utcToZonedTime } from 'date-fns-tz'

class LojaController {

    async show(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const lojas = await Loja.findAll();

        if (!lojas) {
            return res.status(400).json({ error: "nao encontrei lojas cadastradas" })
        }

        return res.status(200).json(lojas)

    }

    async index(req, res) {
        console.log("Entrei no index")
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const { id } = req.params;

        const loja = await Loja.findByPk(id);

        if (!loja) {
            return res.status(400).json({ error: "nao encontrei loja" })
        }

        return res.status(200).json(loja)

    }

    async store(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }
        const { id } = await Loja.create(req.body)
        return res.status(201).json({ id })
    }

    async update(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }
        const { id } = req.params;
        const loja = await Loja.findByPk(id);

        if (!loja) {
            return res.status(400).json({ error: "Não encontrei loja com esse id" })
        }

        const updated = await loja.update(req.body)

        return res.status(200).json(updated)

    }

    async prazoEntrega(req, res) {
        const sql = `
        select now() + (INTERVAL '1 min' * l.prazo_entrega)  as prazo from lojas l
        where id = 1;  
        `
        const tz = 'America/Sao_Paulo'
        const resp = await Loja.sequelize.query(sql, {
            type: QueryTypes.SELECT
        })

        if (!resp) {
            return res.status(400).json({ error: "Não consegui encontrar prazo. " })
        }

        const hora = resp[0].prazo

        return res.status(200).json({prazo:format(hora, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'America/Sao_Paulo' })})


    }


}



export default new LojaController()