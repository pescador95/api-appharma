import Estoque from '../models/Estoque'
const { Op, QueryTypes } = require("sequelize");

class EstoqueController {

    async show(req, res) {
        const { idloja, idproduto } = req.params
        console.log("Entrei para pegar idLoja: "+ idloja +" idproduto: "+ idproduto)
        try {
            const estoque = await Estoque.findAll({
                where: {
                    [Op.and]: [
                        { id_loja: idloja },
                        { id_produto: idproduto }
                    ]
                }
            })

            if (!estoque) {
                return res.status(400).json({ error: "Não encontrei estoque" })
            }

            return res.json(estoque)

        } catch (e) {
            console.log(e.message)
        }
    }

    async store(req, res) {
        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }
        const { id_loja, id_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, fabricante } = req.body
        console.log(JSON.stringify(req.body))
        try {
            const estoque = await Estoque.create({ id_loja, id_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, status: 1, fabricante });
            if (!estoque) {
                return res.status(400).json({ error: "Não pude criar esse estoque" })
            }
            const { id } = estoque;
            return res.status(201).json({ success: "Estoque inserido com sucesso", estoque: { id, id_loja, id_produto, codigo_barras, qtd_estoque, preco_venda, preco_promocao } })
        } catch (e) {
            console.log(e.message)
        }
    }

    async update(req, res) {

        if (!req.userAdmin) {
            return res.json({ error: "Você não é administrador." })
        }
        const { idloja, idproduto } = req.params;
        const { codigo_barras, qtd_estoque, preco_venda, preco_promocao, status, fabricante } = req.body

        console.log(`Tentando atualizar: ${JSON.stringify(req.body)}`)

        try {
            const sql = "select id from estoque where id_loja = :idloja and id_produto = :idproduto";

            const estoque = await Estoque.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements: {
                    idloja,
                    idproduto
                }
            })
            console.log("Vou entrar no undefined" + JSON.stringify(estoque))

            console.log(`Esté é o estoque: ${estoque.length}`)

            if(!estoque){
                console.log("entrei no sem estoque")
            }

            if(typeof(estoque) === 'undefined' || estoque.length <= 0){
                console.log('Entrei no if... ')

                const addEstoque = await Estoque.create({ id_loja:idloja, id_produto:idproduto, codigo_barras, qtd_estoque, preco_venda, preco_promocao, status: 1, fabricante });
                if (!addEstoque) {
                    return res.status(400).json({ error: "Não pude criar esse estoque na atualização do produto: "+idproduto })
                }

                console.log("Criei o estoque... ")
                estoque[0].id = addEstoque.id
                console.log("Não tinha estoque e eu criei um para o produto: "+idproduto)

            }

            console.log("Vou fazer o update do produto id::  "+estoque[0].id)

            const sqlUpdate = `update estoque set codigo_barras = :codigo_barras, qtd_estoque = :qtd_estoque, preco_venda = :preco_venda
                                            ,preco_promocao = :preco_promocao, fabricante=:fabricante, status = :status, updated_at = now()  where id = :id`
            const updateEstoque = await Estoque.sequelize.query(sqlUpdate, {
                type:QueryTypes.UPDATE,
                replacements:{
                    id:estoque[0].id,
                    codigo_barras,
                    qtd_estoque,
                    preco_venda,
                    preco_promocao,
                    status,
                    fabricante
                }
            })

            if(!updateEstoque){
                return res.status(400).json({error: "Não consegui atualizar estoque"})
            }

            return res.status(200).json(updateEstoque)
            
        } catch (e) {
            console.log(e.message)
        }
    }
}

export default new EstoqueController()