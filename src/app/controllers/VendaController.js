import Venda from '../models/Venda'
import { Op, QueryTypes } from 'sequelize'
import Usuario from '../models/User'
import { v4 as uuidv4 } from 'uuid';

class VendaController {

   async store(req, res) {
      const { cart, levar_pinpad, troco_para, tipo_venda = A, tipo_entrega, id_endereco } = req.body
      const now = new Date()
      const uuid = uuidv4()
      const userId = req.userId
      const usuario = await Usuario.findByPk(userId)
      const { cpf } = usuario;


      try {

         cart.map((i, k) => {
            const { codigo_barras, nome, preco_vigente, preco_original, id } = i
            console.log(`vou inserir a venda do item: codigo de barra: ${codigo_barras}  nome: ${nome} valor: ${preco_vigente} id: ${id} com o id_endereco: ${id_endereco}`)
            for (let j = 0; j < i.qtd; j++) {
               Venda.create({ status: 'Pendente', codigo_venda: uuid, id_user: userId, id_produto: id, codigo_barras, nome, valor_liquido: preco_vigente, cpf, created_at: now, updated_at: now, data_venda: now, tipo_venda, levar_pinpad, troco_para, tipo_entrega, id_endereco, valor_original: preco_original })
            }
         })

         return res.status(201).json({ sucesso: "Venda efetuada com sucesso", codigo_venda: uuid })
      } catch (e) {
         console.log(e.message)
         return res.status(500).json({ erro: e.message })
      }
   }

   async show(req, res) {
      const sql = `select v.codigo_venda, v.data_venda, v.cpf, u.name, ua.rua, ua.numero, ua.complemento, ua.bairro, ua.cep, v.tipo_venda, v.tipo_entrega, v.levar_pinpad, v.troco_para, COUNT(*) AS qtdItens, SUM(v.valor_liquido) AS total  FROM vendas v
                           INNER JOIN users u ON v.id_user = u.id
                           LEFT JOIN user_address ua ON v.id_endereco = ua.id
                           
                           WHERE v.status IN ('Pendente', 'Confirmado', 'Enviado')
                        
                           GROUP BY v.codigo_venda, v.data_venda, v.cpf, u.name, ua.rua, ua.numero, ua.complemento, ua.bairro, ua.cep, v.tipo_venda, v.tipo_entrega, v.levar_pinpad, v.troco_para
                           
                           ORDER BY v.data_venda`

      try {

         const vendas = await  Venda.sequelize.query(sql, {
            type: QueryTypes.SELECT,
         });

         if (!vendas){
            return res.json({error:'não achei vendas no aplicativo'})
         }
         res.json(vendas)
      } catch(error) {
         console.log(`Erro ao puxar vendas ${error.message}`)
         return res.status(501).json({error:e.message})
      }



   }
}

export default new VendaController;