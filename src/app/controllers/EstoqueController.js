import Estoque from '../models/Estoque'
const { Op } = require("sequelize");

class EstoqueController {

   async show(req, res){
      const {idloja, idproduto} = req.params
      try{
         const estoque = await Estoque.findAll({
            where: {
                [Op.and]: [
                  { id_loja: idloja },
                  { id_produto:idproduto }
                ]
              }
            })
   
         if(!estoque){
            return res.status(400).json({error:"Não encontrei estoque"})
         }
   
         return res.json(estoque)

      }catch(e){  
         console.log(e.message)
      }
   }

   async store(req, res){
    if (!req.userAdmin){
        return res.json({error:"Você não é administrador."})
     }
      const {id_loja, codigo_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, fabricante} = req.body
      console.log(JSON.stringify(req.body))
      try{
         const estoque = await Estoque.create({id_loja, id_produto:codigo_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, ativo:1, fabricante});
         if(!estoque){
            return res.status(400).json({error:"Não pude criar esse estoque"})
         }
         const {id} = estoque;
         return res.status(201).json({success:"Estoque inserido com sucesso", estoque:{id, id_loja, codigo_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao}}) 
      }catch (e){
         console.log(e.message)
      }
   }

   async update(req, res){
       console.log("Entrei no update do estoque")
    if (!req.userAdmin){
        return res.json({error:"Você não é administrador."})
     }
      const {idloja, idproduto} = req.params; 
      const {id_loja, id_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, ativo} = req.body
      try{
         const estoque = await Estoque.findOne({
            where: {
                [Op.and]: [
                  { id_loja: idloja },
                  { id_produto:idproduto }
                ]
              }
         })
         if(!estoque){
            return res.status(400).json({error:"Não encontrei o estoque!"})
         }
         const id = estoque.update({id_loja, id_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, ativo})
         return res.status(200).json({success:"Atualizado com sucesso", id}) 
      }catch (e){
         console.log(e.message)
      }
   }

}

export default new EstoqueController()