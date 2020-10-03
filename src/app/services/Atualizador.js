import useEstoque from '../controllers/EstoqueController'
import useDiff from '../services/UseDiff'

const Atualizador = {
   atualizaEstoque: async (tabelaAtualizada) => {
      const estoque = useEstoque();
      const diff = useDiff()
      console.log("--------------------- entrar no get tabela ----------------------")
      const tabelaEstoque = await estoque.getTabela()
      if(tabelaAtualizada){
         console.log("Tenho tabela atualizada")
      }
      if(tabelaEstoque){
         console.log("tenho tabela de estoque velha")
      }
      
      await diff.verificaEstoque(tabelaAtualizada, tabelaEstoque);
      console.log('socket finalizado')
   }


}

export default () => Atualizador