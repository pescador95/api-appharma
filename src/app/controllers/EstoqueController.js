import db from '../../config/postgres'


const useEst = {
   update: async (req) => {
      const { codigo_barras, preco_venda, preco_promocao, qtd_estoque } = req;
      const params = [codigo_barras, preco_venda, preco_promocao, qtd_estoque]
      const sql = `UPDATE estoque SET qtdestoque = $4, preco_venda = $2, preco_promocao = $3, updated_at = NOW() WHERE codigo_barras = $1 `
      try {
      await db.query(sql, params)
      } catch (e) {
         console.log(e.message)
      }

   },
   getTabela: async () =>{
      const qry = `SELECT codigo_barras, qtdestoque as qtd_estoque, preco_venda, preco_promocao FROM estoque
      ORDER BY codigo_barras `
      const resp = await db.query(qry)
      return resp.rows
   }

}

export default () => useEst;