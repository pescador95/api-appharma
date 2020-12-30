import Loja from '../models/Loja'

class LojaController {

    async show(req, res){
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const lojas = await Loja.findAll();

        if (!lojas){
            return res.status(400).json({error:"nao encontrei lojas cadastradas"})
        }

        return res.status(200).json(lojas)

    }

    async index(req, res){
        console.log("Entrei no index")
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }

        const {id} = req.params;

        const loja = await Loja.findByPk(id);

        if (!loja){
            return res.status(400).json({error:"nao encontrei loja"})
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
        const {id} = req.params;
        const loja = await Loja.findByPk(id);

        if (!loja){
            return res.status(400).json({error:"Não encontrei loja com esse id"})
        }

        const updated = await loja.update(req.body)

        return res.status(200).json(updated)

    }


}



export default new LojaController()