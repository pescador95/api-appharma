import useEstoque from '../controllers/EstoqueController'

const UseDiff = {
   verificaEstoque : async (tabelaAtualizada, tabelaAntiga) =>{
      const estoque = useEstoque()
     const fuckingPromise = tabelaAntiga.map( async (i,k) =>{
         const itemNovo = tabelaAtualizada.filter(novo_item => novo_item.codigo_barras == i.codigo_barras);
         console.log(`Item novo: ${JSON.stringify(itemNovo)} - item velho: ${JSON.stringify(i)}`)

         if (!itemNovo){
            return
         }

         console.log("AChei item novo: "+JSON.stringify(itemNovo))

         if (parseFloat(i.qtdestoque) != parseFloat(itemNovo[0].qtd_estoque)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: itemNovo[0].preco_venda, preco_promocao: itemNovo[0].preco_promocao, qtd_estoque: itemNovo[0].qtd_estoque })
            return
         }
   
         if (parseFloat(i.preco_venda) != parseFloat(itemNovo[0].preco_venda)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: itemNovo[0].preco_venda, preco_promocao: itemNovo[0].preco_promocao, qtd_estoque: itemNovo[0].qtd_estoque })
            return
         }
   
         if (parseFloat(i.preco_promocao) != parseFloat(itemNovo[0].preco_promocao)) {
            await estoque.update({ codigo_barras: itemNovo[0].codigo_barras, preco_venda: itemNovo[0].preco_venda, preco_promocao: itemNovo[0].preco_promocao, qtd_estoque: itemNovo[0].qtd_estoque })
            return
         }
   
      })

      await Promise.all(fuckingPromise)
      console.log("Atualizei tabela de estoque...")
   }

}

export default () => UseDiff