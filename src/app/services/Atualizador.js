import useEstoque from '../controllers/EstoqueController'
import useDiff from '../services/UseDiff'

const Atualizador = {
   atualizaEstoque: async (tabelaAtualizada) => {
      const estoque = useEstoque();
      const diff = useDiff()
      const tabelaEstoque = await estoque.getTabela()
      
      if (tabelaEstoque){
         console.log(`Peguei a tabela do estoque SERVIDOR`)
      }
      if(tabelaAtualizada){
         console.log("--------------- TENHO A TABELA QUE RECEBI ATUALIZADA ---------------")
      }
      await diff.verificaEstoque(tabelaAtualizada, tabelaEstoque);
      console.log('socket finalizado')
   }


}

export default () => Atualizador