import Venda from '../models/Venda'
import { v4 as uuidv4 } from 'uuid';

class VendaController {

   async store(req, res){

      const cart = req.body;

      map.cart((i,k) =>{
               console.log(`uudi da venda: ${uuid} produto: ${i.nome} quantidade no carrinho: ${i.qtd}`)
             })


      return res.json(req.body)
      // try{
      //    const uuid = uuidv4();
      //    const {cart} = req.body;

      //    map.cart((i,k) =>{
      //       console.log(`uudi da venda: ${uuid} produto: ${i.nome} quantidade no carrinho: ${i.qtd}`)
      //    })
      //    //const venda = Venda.create({codigo_venda:uuid, cpf, codigo_barras, id_produto, })
      //    //return res.json(venda)
      // } catch(e) {
      //    return res.status(500).json({error:'Internal server error'})
      // }

   }

}

export default new VendaController;