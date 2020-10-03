import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque: async (tabelaAtualizada, tabelaAntiga) => {
      console.log("Vou verificar as diferenças entre as 2 tabelas que eu recebi....")
      const estoque = useEstoque()
      const promise = tabelaAntiga.map(async (i, k) => {

         const itemNovo = await tabelaAtualizada.filter(novo_item => novo_item.codigo_barras == i.codigo_barras);

         if (!itemNovo) {
            return
         }
         
         if (typeof  itemNovo[0].qtd_estoque === 'undefined') {
            return
         }
         if (typeof itemNovo[0].preco_venda === 'undefined') {
            return
         }
         if (typeof itemNovo[0].preco_promocao === 'undefined') {
            return
         }
         
         //FIZ ISSO PRA TENTAR ACHAR ONDE ESTÁ O UNDEFINED
        let estoqueAtt =  itemNovo[0].qtd_estoque
        let precoVendaAtt = itemNovo[0].preco_venda
        let precoPromoAtt = itemNovo[0].preco_promocao

         if (parseFloat(i.qtd_estoque) != parseFloat(estoqueAtt)) {
            console.log(`vou atualizar o ${JSON.stringify(itemNovo)}`)
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }

         if (parseFloat(i.preco_venda) != parseFloat(precoVendaAtt)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }

         if (parseFloat(i.preco_promocao) != parseFloat(precoPromoAtt)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao: precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }

      })

      await Promise.all(promise)
      console.log("Atualizei tabela de estoque...")
   }

}

export default () => UseDiff