import useEstoque from '../controllers/EstoqueController'
import useDiff from '../services/UseDiff'

const Atualizador = {
   atualizaEstoque: async (tabelaAtualizada) => {
      const estoque = useEstoque();
      const diff = useDiff()
      const tabelaEstoque = await estoque.getTabela()
      
      console.log(`Peguei a tabela do estoque SERVIDOR`)
      console.log(JSON.stringify(tabelaEstoque))
      console.log("--------------- TENHO A TABELA QUE RECEBI ATUALIZADA ---------------")
      console.log(JSON.stringify(tabelaAtualizada))
     // await diff.verificaEstoque(tabelaAtualizada, tabelaEstoque);
      console.log('socket finalizado')
   }


}

export default () => Atualizador