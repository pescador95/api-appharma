import Estoque from '../models/Estoque'

class EstoqueController {
   async show(){
      const tabela = await Estoque.findAll({order:['codigo_barras']})
      return tabela
   }
}

export default new EstoqueController()