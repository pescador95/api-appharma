import Fcm from '../models/Fcm'
import Mensagem from '../models/Mensagem'
import { SendMessage, GetTokens } from '../services/FCM'

class FcmController {

    async store(req, res) {
        const { token } = req.body;
        const existe = await Fcm.findOne({ where: { token } })
        if (existe) {
            return res.status(400).json({ error: 'token já cadastrado' })
        }
        const fcm = await Fcm.create({ token })
        return res.json({ fcm })
    }

    async update(req, res) {
        const { token } = req.body;
        const userId = req.userId;
        const celularToken = Fcm.findOne({ where: { token } })
        if (!celularToken) {
            return res.status(400).json({ error: "não encontrei o token" })
        }
        const atualizedCelularToken = (await celularToken).update({ id_user: userId })
        return res.json({ sucess: 'atualizado com o id do usuario', atualizedCelularToken })
    }

    async show(req, res) {
        const { page = 1 } = req.query
        const tokens = await Fcm.findAll({
            limit: 20,
            offset: (page - 1) * 20,
        });

    }


    async sendMessage(req, res) {

        if (!req.userAdmin) {
            return res.json({ error: "Você não tem permissão." })
        }

        const { iduser, idmsg } = req.params

        const { mensagem, title } = req.body


        const tokensAux = await GetTokens(iduser,)

        console.log("Tokens depois do gettokens: " + JSON.stringify(tokensAux))

        if (!tokensAux) {
            return res.status(400).json({ error: "Não existem tokens para esse usuario" })
        }

        const registrationTokens = [];

        tokensAux.map((i, k) => {
            registrationTokens.push(i.token)
        })

        if (!mensagem) {
            const mgm = await Mensagem.findByPk(idmsg)

            if (!mgm) {
                return res.status(400).json({ error: 'mensagem não existe' })
            }
            const { titulo, corpo, tipo_msg } = mgm;

            console.log(`eu recebi: ${JSON.stringify(mgm)}`)
            
            let tipoMsg = toString(tipo_msg);
            
            console.log(`Eu estou com o tipo msg: ${tipoMsg}`)


            const agora = new Date().toLocaleString('pt-br')

            const message = {
                data: { tipo: tipoMsg, time: agora.toString(), corpo },
                tokens: registrationTokens,
                notification: {
                    body: corpo,
                    title: `Appharma - ${titulo}`,
                }
            }
            SendMessage(message, registrationTokens);
        } else {
            const agora = new Date().toLocaleString('pt-br')
            const message = {
                data: { tipo: 'Broadcast', time: agora.toString(), mensagem },
                tokens: registrationTokens,
                notification: {
                    body: mensagem,
                    title: `Appharma - ${title}`,
                }
            }
            SendMessage(message, registrationTokens);

        }

        return res.json({ mgm: "Enviei?" })
    }


    async utlimoAcesso(req, res) {
        const { fcmToken } = req.body;
        const agora = new Date();
        try {
            const fcm = await Fcm.findOne({ where: { token: fcmToken } })
            await fcm.update({ ultimo_acesso: agora })
            return res.json(fcm)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }
    }


}
export default new FcmController();