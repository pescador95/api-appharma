import User from '../models/User'
import jwt from 'jsonwebtoken'

class UserController {

    async index(req, res) {
        const { cpf } = req.params;

        const user = await User.findOne({
            where: { cpf }
        })
        if (!user) {
            return res.status(200).json({ error: "Usuario não existe" })
        }

        return res.status(200).json({
            success: "Existe um usuario",
            user: {
                id: user.id,
                nome: user.name,
                enderecos: user.UserAddresses,
                whatsapp: user.whatsapp,
                dt_nasc: user.dt_nasc,
                email: user.email
            }
        })

    }

    async store(req, res) {

        const { cpf, name, password, confirmPassword, whatsapp } = req.body

        const exists = await User.findOne({ where: { cpf } })

        if (exists) {
            return res.status(401).json({ error: "Usuario já existe" })
        }


        const { id, admin, superadmin } = await User.create({ cpf, name, password, confirmPassword, whatsapp })

        const token = jwt.sign({ id, name, admin, superadmin }, process.env.SECRET, {})

        return res.status(201).json({
            id,
            cpf,
            name,
            token,
            msg: "success"
        })

    }

    async update(req, res) {

        const { email, password, oldpassword, name, whatsapp } = req.body
        const id = req.userId
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(400).json({ error: "Não autorizado" })
        }

        if (email && email !== user.email) {
            const exist = await User.findOne({ where: { email } })
            if (exist) {
                return res.status(400).json({ error: "Usuario ja existe" })
            }
        }

        if (password) {
            if (!oldpassword) {
                return res.status(401).json({ error: "Senha antiga não confere" })
            }
            if (!(await user.checkPassword(oldpassword))) {
                return res.status(401).json({ error: "Senha antiga não confere" })
            }
        }

        const updated = await user.update(req.body)
        return res.json({ updated })
    }



}
export default new UserController();