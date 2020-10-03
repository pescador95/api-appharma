import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque: async (tabelaAtualizada, tabelaAntiga) => {
      console.log("Vou verificar as diferenças entre as 2 tabelas que eu recebi....")
      const estoque = useEstoque()
      let cont;
      const fuckingPromise = tabelaAntiga.map(async (i, k) => {

         const itemNovo = tabelaAtualizada.filter(novo_item => novo_item.codigo_barras == i.codigo_barras);

         if (!itemNovo) {
            return
         }


         let estoqueAtt = itemNovo[0].qtd_estoque
         let precoVendaAtt = itemNovo[0].preco_venda
         let precoPromoAtt = itemNovo[0].preco_promocao
         console.log(`Esses são os valores quee u preciso att: ${estoqueAtt} ${precoVendaAtt} e ${precoPromoAtt} é isso.. fuck!`)
         cont++;

         // if (parseFloat(i.qtd_estoque) != parseFloat(estoqueAtt)) {
         //    console.log(`vou atualizar o ${JSON.stringify(itemNovo)}`)
         //    await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
         //    return
         // }

         // if (parseFloat(i.preco_venda) != parseFloat(precoVendaAtt)) {
         //    await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
         //    return
         // }

         // if (parseFloat(i.preco_promocao) != parseFloat(precoPromoAtt)) {
         //    await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
         //    return
         // }

      })

      await Promise.all(fuckingPromise)
      console.log("Atualizei tabela de estoque... e o contador é: "+cont)
   }

}

export default () => UseDiff