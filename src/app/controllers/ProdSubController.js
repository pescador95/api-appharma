import { Op, QueryTypes } from 'sequelize'
import PrododutoSubcategorias from '../models/ProdutoSubcategorias'
import SubCategoria from '../models/SubCategoria'
import Produto from '../models/Produto'

class ProdSubController {

    async store(req, res){
        const {id_subcategoria, id_produto} = req.body 

        try{

            const subcategoria = await SubCategoria.findAll({where:{id:id_subcategoria}})
            
            if (!subcategoria){
                return res.status(200).json({error:'Não existe essa subcategoria!'})
            }
            
            const produto = await Produto.findAll({where:{id:id_produto}})
            
            if(!produto){
                return res.status(200).json({error:"Não existe esse produto!"})
            }
            
            const prodSub = await PrododutoSubcategorias.create({id_subcategoria, id_produto})

            return res.json(prodSub)
            
        } catch (e) {
            if (e.errors[0].type === 'unique violation'){
                return res.status(200).json({error: 'Esse produto já está vinculado nessa categoria!'})
            } else {
                console.log("Pau: "+JSON.stringify(e))
                return res.status(500).json({error: e.errors[0].message})
            }
        }

    }

}

export default new ProdSubController()