import useEstoque from '../controllers/EstoqueController'

const Atualizador = {
   atualizaEstoque: async (tabelaAtualizada) => {
      const estoque = useEstoque();
      const tabelaEstoque = estoque.getTabela()
      console.log("Peguei tabela vigente que vou comparar: ")
      console.log(JSON.stringify(tabelaEstoque))
      // const ret = await attDiffItems(tabelaReply, tabelaErp);
      // console.log(`Devo mandar emit no socket?  ${ret}`)
      // if (ret){
      //    const novaTabela = await estoque.getTabela();
      //    socket.emit('atualizar-estoque', novaTabela)
      // }
   }


}

export default () => Atualizador