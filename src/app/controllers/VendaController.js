import Venda from '../models/Venda'
import Usuario from '../models/User'
import { v4 as uuidv4 } from 'uuid';

class VendaController {

   async store(req, res) {
      const { cart, levar_pinpad, troco_para, tipo_venda = A } = req.body
      const now = new Date()
      const uuid = uuidv4()
      const userId = req.userId
      const usuario = await Usuario.findByPk(userId)
      const { cpf } = usuario;

      try {

         cart.map((i, k) => {
            const { codigo_barras, nome, preco_vigente, id } = i
            console.log(`vou inserir a venda do item: codigo de barra: ${codigo_barras}  nome: ${nome} valor: ${preco_vigente} id: ${id}`)
            for (let j = 0; j < i.qtd; j++) {
               Venda.create({ codigo_venda: uuid, id_user: userId, id_produto: id, codigo_barras, nome, valor_liquido: preco_vigente, cpf, created_at: now, updated_at: now, data_venda: now, tipo_venda, levar_pinpad, troco_para })
            }
         })

         return res.status(201).json({ sucesso: "Venda efetuada com sucesso", codigo_venda: uuid })
      } catch (e) {
         console.log(e.message)
         return res.status(500).json({ erro: e.message })
      }
   }

}

export default new VendaController;