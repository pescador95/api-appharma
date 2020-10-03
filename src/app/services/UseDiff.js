import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque: async (tabelaAtualizada, tabelaAntiga) => {
      console.log("Analisando tabelas e atualizando diferenças.")
      const estoque = useEstoque()
      const promise = tabelaAtualizada.map(async (i, k) => {

         const itemAtual = await tabelaAntiga.filter(item => item.codigo_barras == i.codigo_barras);

         if (!itemAtual) {
            return
         }
         
         if (typeof  itemAtual[0].qtd_estoque === 'undefined') {
            return
         }
         if (typeof itemAtual[0].preco_venda === 'undefined') {
            return
         }
         if (typeof itemAtual[0].preco_promocao === 'undefined') {
            return
         }
         
        let estoqueAtt =  itemAtual[0].qtd_estoque
        let precoVendaAtt = itemAtual[0].preco_venda
        let precoPromoAtt = itemAtual[0].preco_promocao

         if (parseFloat(i.qtd_estoque) != parseFloat(estoqueAtt)) {
            await estoque.update({ codigo_barras: i.codigo_barras, preco_venda: i.preco_venda, preco_promocao: i.preco_promocao, qtd_estoque: i.qtd_estoque })
            return
         }

         if (parseFloat(i.preco_venda) != parseFloat(precoVendaAtt)) {
            await estoque.update({ codigo_barras: i.codigo_barras, preco_venda: i.preco_venda, preco_promocao: i.preco_promocao, qtd_estoque: i.qtd_estoque })
            return
         }

         if (parseFloat(i.preco_promocao) != parseFloat(precoPromoAtt)) {
            await estoque.update({ codigo_barras: i.codigo_barras, preco_venda: i.preco_venda, preco_promocao: i.preco_promocao, qtd_estoque: i.qtd_estoque })
            return
         }

      })

      await Promise.all(promise)
      console.log("Atualizei tabela de estoque...")
      return true
   }

}

export default () => UseDiff