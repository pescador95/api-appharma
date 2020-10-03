import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque : async (tabelaAtualizada, tabelaAntiga) =>{
      console.log("Vou verificar as diferenças entre as 2 tabelas que eu recebi....")
      const estoque = useEstoque()
     const fuckingPromise = tabelaAntiga.map( async (i,k) =>{
        
         const itemNovo = tabelaAtualizada.filter(novo_item => novo_item.codigo_barras == i.codigo_barras);

         if (!itemNovo){
            return
         }

         
         let estoqueAtt = itemNovo[0].qtd_estoque
         let precoVendaAtt = itemNovo[0].preco_venda
         let precoPromoAtt = itemNovo[0].preco_promocao
         
         if (!estoqueAtt){
            console.log(`Eu acho que esse ${estoqueAtt} esta undefined e que ele pertence ao ${itemNovo}`)
         }

         if (parseFloat(i.qtd_estoque) != parseFloat(estoqueAtt)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao:precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }
   
         if (parseFloat(i.preco_venda) != parseFloat(precoVendaAtt)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao:precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }
   
         if (parseFloat(i.preco_promocao) != parseFloat(precoPromoAtt)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: precoVendaAtt, preco_promocao:precoPromoAtt, qtd_estoque: estoqueAtt })
            return
         }
   
      })

      await Promise.all(fuckingPromise)
      console.log("Atualizei tabela de estoque...")
   }

}

export default () => UseDiff