import useEstoque from '../controllers/EstoqueController'
import useDiff from '../services/UseDiff'

const Atualizador = {
   atualizaEstoque: async (tabelaAtualizada) => {
      const estoque = useEstoque();
      const diff = useDiff()
      const tabelaEstoque = await estoque.getTabela()
      
      await diff.verificaEstoque(tabelaAtualizada, tabelaEstoque);
      console.log('socket finalizado')
   }


}

export default () => Atualizador