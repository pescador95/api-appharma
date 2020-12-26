import Produto from '../models/Produto'
import File from '../models/File'

class ProdutoService {
    async ProdutoExiste({ idProduto, codigoBarras, body} ) {
        let produto;

        console.log("id produto: "+idProduto);

        // codigo_produto = p.CodigoProduto,
        //             codigo_barras = p.CodigoBarra,
        //             nome = p.NomeProduto,
        //             id_grupo = p.CodigoGrupo,
        //             id_sessao = p.CodigoSessao,
        //             principio = p.Formula,

        // Se passar codigo de barras, retorna uma consulta. Se passa id retorna outra.
        if (codigoBarras) {
          
            produto = await Produto.findOne(
                {
                    where: { codigo_barras: codigoBarras },
                    attributes: ['id', 'nome', 'valor_venda'],
                    include: [
                        {
                            model: File,
                            as: "image",
                            attributes: ['name', 'path', 'url']
                        }
                    ]
                })
        }


        if (idProduto) {
            console.log("Tem id produto")
            let id = idProduto;
            try{
           //     produto = await Produto.findByPk(id)
                const sqlUpdate = `update produtos set codigo_barras = :codigo_barras, nome = :nome, principio = :principio, id_grupo=:id_grupo, id_sessao=:id_sessao` 
            } catch (e){
                console.log(e.message)
            }
            
        }

        if (!produto) {
            throw new Error("Produto não existe")
        }
        return produto
    }


}

export default new ProdutoService()