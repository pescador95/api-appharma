import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque : async (tabelaAtualizada, tabelaAntiga) =>{
      console.log("Dentro do hook -------------------------------------------------------- ")
      console.log(JSON.stringify(tabelaAtualizada))
      const estoque = useEstoque()
     const fuckingPromise = tabelaAntiga.map( async (i,k) =>{
         const itemNovo = tabelaAtualizada.filter(novo_item => novo_item.codigo_barras == i.codigo_barras);
         if (parseFloat(i.qtdestoque) != parseFloat(itemNovo[0].qtd_estoque)) {
            await estoque.update({ codigo_barras: item[0].codigo_barras, preco_venda: item[0].preco_venda, preco_promocao: item[0].preco_promocao, qtd_estoque: item[0].qtd_estoque })
            return
         }
   
         if (parseFloat(i.preco_venda) != parseFloat(item[0].preco_venda)) {
            await estoque.update({ codigo_barras: item[0].codigo_barras, preco_venda: item[0].preco_venda, preco_promocao: item[0].preco_promocao, qtd_estoque: item[0].qtd_estoque })
            return
         }
   
         if (parseFloat(i.preco_promocao) != parseFloat(item[0].preco_promocao)) {
            await estoque.update({ codigo_barras: item[0].codigo_barras, preco_venda: item[0].preco_venda, preco_promocao: item[0].preco_promocao, qtd_estoque: item[0].qtd_estoque })
            return
         }
   
      })

      await Promise.all(fuckingPromise)
      console.log("Atualizei tabela de estoque...")
   }

}

export default () => UseDiff