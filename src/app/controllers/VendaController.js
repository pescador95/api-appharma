import Venda from '../models/Venda'
import Usuario from '../models/User'
import { v4 as uuidv4 } from 'uuid';

class VendaController {

   async store(req, res){
      // const {cart, levar_pinpad, troco_para, tipo_venda = A} = req.body
      // const now = new Date()
      // const uuid = uuidv4()
      // const userId = req.userId
      // const usuario = await Usuario.findByPk(userId)

      // const {cpf} = usuario;

      // cart.map((i,k) =>{
      //          console.log(`uudi da venda: ${uuid} produto: ${i.nome} quantidade no carrinho: ${i.qtd}`)
      //          const {codigo_barras, nome, preco_vigente, id, }
      //          for(let j=0; j < i.qtd; j++ ){
      //             Venda.create({codigo_venda:uuid, user_id:userId, id_produto:id, codigo_barras, nome, valor_liquido:preco_vigente, cpf, created_at:now, updated_at:now, data_venda:now, tipo_venda, levar_pinpad, troco_para})
      //          }
      //        })


      return res.json(req.body)


   }

}

export default new VendaController;