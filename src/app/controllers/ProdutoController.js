import { Op, QueryTypes } from 'sequelize'
import Produto from '../models/Produto'
import ProdutoService from '../services/ProdutoService'
import db from '../../config/postgres'

class ProdutoController {

    async show(req, res) {

        const { page = 1 } = req.query

        const data = new Date();

        const sql = `select p.id, 
                        p.codigo_barras, 
                        p.nome, 
                        p.descricao,
                        e.qtd_estoque, 
                        f.path,
                        COALESCE(p1.preco_promocao, e.preco_venda) AS preco,
                        COALESCE((1-p1.preco_promocao / e.preco_venda)*100, 0) AS discount,
                        e.id as id_estoque,
                        e.fabricante
                    FROM produtos p
                    inner JOIN estoque e ON p.id = e.id_produto
                    LEFT JOIN promocoes p1 ON p1.id_produto = p.id AND  data_inicio < :data AND data_fim > :data
                    left JOIN files f ON f.id = p.img_id
                    WHERE qtd_estoque > 0 
                    order BY nome
                    LIMIT 30 OFFSET :page `
        const sql_count = `select COUNT(*) as total
                                FROM produtos p
                                inner JOIN estoque e ON p.id = e.id_produto
                                LEFT JOIN promocoes p1 ON p1.id_produto = p.id AND  data_inicio < :data AND data_fim > :data
                            WHERE qtd_estoque > 0 `



        try {

            const count = await Produto.sequelize.query(sql_count, {
                type: QueryTypes.SELECT,
                replacements: {
                    data,
                }
            })

            const paginas = Math.round(count[0].total / 30)

            const offset = (page - 1) * 30

            const listaProdutos = await Produto.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements: {
                    data,
                    page: offset
                }
            });
            if (!listaProdutos) {
                return res.status(400).json({ error: "não encontrei produtos" })
            }

            return res.json({ produtos: listaProdutos, pagina: page, paginas })
        } catch (e) {
            console.log(e.message)
        }
    }

    async search(req, res) {
        const { name, page = 1 } = req.query
        console.log("estamos entrando no search")
        const data = new Date();
        const sql = `
        SELECT p.id, p.codigo_barras, p.nome, p.descricao, p.id_tipo as tipo, 
        COALESCE(p1.preco_promocao, e.preco_venda) AS preco_vigente, COALESCE(p1.preco_promocao, e.preco_venda) AS preco,  e.preco_venda, 
        e.preco_venda as preco_original, p1.preco_promocao, p1.data_inicio, p1.data_fim, f.path AS image, f.path, p.principio, 
        COALESCE((1-p1.preco_promocao / e.preco_venda)*100, 0) AS discount, e.qtd_estoque, 0 as qtd, e.id as id_estoque, e.fabricante
              FROM produtos p  
               INNER JOin estoque e on p.id = e.id_produto
               left JOIN promocoes p1 ON p.id = p1.id_produto  and p1.data_inicio < :data  and p1.data_fim > :data    
                LEFT JOIN files f ON p.img_id = f.id                                                                                                    
              WHERE p.nome LIKE :search_name and e.qtd_estoque > 0       
        order by discount desc
        limit 30 offset :offset
      `;

        const sql_count = ` select count(*) as total
                                    FROM produtos p  
                                    INNER JOin estoque e on p.id = e.id_produto
                                        left JOIN promocoes p1 ON p.id = p1.id_produto   and p1.data_inicio < :data  and p1.data_fim > :data     
                                        LEFT JOIN files f ON p.img_id = f.id                                                                                                    
                                    WHERE p.nome LIKE :search_name  and e.qtd_estoque > 0   `;

        let searchName = `%${name}%`

        try {

            const count = await Produto.sequelize.query(sql_count, {
                type: QueryTypes.SELECT,
                replacements: {
                    search_name: searchName,
                    data,
                }
            })

            const paginas = Math.round(count[0].total / 30)

            const offset = (page - 1) * 30

            const listaProdutos = await Produto.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements: {
                    search_name: searchName,
                    data,
                    offset
                }
            });
            if (!listaProdutos) {
                return res.status(400).json({ error: "não encontrei produtos" })
            }
            return res.json({ produtos: listaProdutos, pagina: page, paginas })
        } catch (e) {
            console.log(e.message)
        }

    }
    async selectProduct(req, res) {
        const { id } = req.query

        const qry = `select p.id, 
        p.codigo_barras, 
        p.nome, 
        p.descricao,
        e.qtd_estoque, 
        f.path,
        e.preco_venda as preco_original,
        CASE
          WHEN COALESCE(p1.preco_promocao, e.preco_promocao) > 0 then COALESCE(p1.preco_promocao, e.preco_promocao)
          WHEN COALESCE(p1.preco_promocao, e.preco_promocao) <= 0 then e.preco_venda 
        END AS preco_vigente,
        CASE
          WHEN COALESCE((1-p1.preco_promocao / e.preco_venda)*100, (1-e.preco_promocao / e.preco_venda)*100) < 100 THEN COALESCE((1-p1.preco_promocao / e.preco_venda)*100, (1-e.preco_promocao / e.preco_venda)*100)
          ELSE 0 
        END AS discount,
        e.id as id_estoque, 0 as qtd, p.principio, e.fabricante
    FROM produtos p
    inner JOIN estoque e ON p.id = e.id_produto
    LEFT JOIN promocoes p1 ON p1.id_produto = p.id AND  data_inicio < now() AND data_fim > now()
    left JOIN files f ON f.id = p.img_id
    WHERE qtd_estoque > 0 and p.id = :codigo`

        try {

            const produto = await Produto.sequelize.query(qry, {
                type:QueryTypes.SELECT,
                replacements:{
                    codigo:id
                }
            })

            if (!produto) {
                return res.status(400).json({ error: "Produto não  encontrado" })
            }

            return res.status(200).json(produto)

        } catch (e) {
            console.log("Erro ao pegar produto: " + e.messae)
            return res.status(500).json({ error: "Erro fatal" })
        }


    }

    async topSellers(req, res) {

        const params = ['2020-04-28T00:00:00-03', '2020-01-01T00:00:00-03', '2020-04-30T00:00:00-03']
        const sql = " SELECT tmp.id, tmp.nome, tmp.preco_vigente, tmp.preco_original, tmp.preco_promocao, image, discount, COUNT(*) AS total FROM ( " +
            "                                                                                                                                                              " +
            " SELECT p.id , p.codigo_barras, p.nome, p.descricao,                                                                                                           " +
            "        COALESCE(p1.preco_promocao, e.valor_venda) AS preco_vigente, p.valor_venda as preco_original, e.preco_promocao, f.path AS image, p.principio,        " +
            "        COALESCE((1 - p1.preco_promocao / e.valor_venda)*100, 0) AS discount                                                                                        " +
            "     FROM produtos p                                                                                                                                          " +
            "   left JOIN promocoes p1 ON p.id = p1.id_produto  and p1.data_inicio < $1 and p1.data_fim > $1                                                            " +
            "   LEFT JOIN files f ON p.img_id = f.id                                                                                                                       " +
            "   INNER JOIN vendas v ON p.id = v.id_produto                                                                                                                 " +
            "   LEFT JOIN tipo_produto tp ON p.id_tipo = tp.id                                                                                                             " +
            "   WHERE v.data_venda BETWEEN $2 AND $3 AND p1.codigo_barras <> '12345679'                                                                " +
            "   ) tmp                                                                                                                                                      " +
            "                                                                                                                                                              " +
            "   GROUP BY  tmp.id, tmp.nome, tmp.preco_vigente, tmp.preco_original, tmp.preco_promocao,  image, discount                       " +
            "   ORDER BY total desc                                                                                                                                        " +
            "                                                                                                                                                              " +
            "   LIMIT 15                                                                                                                                                   ";


        try {
            const lista = await db.query(sql, params)
            if (!lista) {
                return res.status(400).json({ error: 'Impossivel pegar produtos' })
            }

            return res.json(lista.rows)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }

    }

    async similars(req, res) {

        const { id, tipo } = req.query;

        const params = ['2020-04-28T00:00:00-03', tipo, id]
        const sql =
            "SELECT p.id , p.codigo_barras, p.nome, p.descricao, " +
            "                 COALESCE(p1.preco_promocao, e.preco_venda) AS preco_vigente, e.peco_venda as preco_original, p1.preco_promocao, f.path AS image, p.principio, " +
            "                  COALESCE((1 - p1.preco_promocao / e.preco_venda)*100, 0) AS discount " +
            "      FROM produtos p  " +
            "      left JOIN promocoes p1 ON p.id = p1.id_produto and p1.data_inicio < $1 and p1.data_fim > $1" +
            "      LEFT JOIN files f ON p.img_id = f.id           " +
            "      INNER JOIN estoque e ON p.id = e.id_produto      " +
            "      WHERE p.id_tipo = $2 AND e.qtdestoque > 0 and p.id <> $3    " +
            "  ORDER BY discount DESC, preco_vigente asc        ";


        try {
            const lista = await db.query(sql, params)
            if (!lista) {
                return res.status(400).json({ error: 'Impossivel pegar produtos' })
            }

            return res.json(lista.rows)
        } catch (e) {
            return res.status(400).json({ error: e.message })
        }

    }

    async index(req, res) {
        const { barra } = req.params

        const produto = await ProdutoService.ProdutoExiste({ codigoBarras: barra })

        if (!produto) {
            return res.status(400).json({ error: "Poduto não encontrado" })
        }

        return res.status(200).json(produto)

    }

    async store(req, res) {

        if (!req.userAdmin) {
            return res.status(401).json({ error: "Cadastro permitido apenas para administradores" })
        }

        const produto = await Produto.create(req.body)

        if (!produto) {
            return res.status(400).json({ error: "Não foi possivel criar o produto" })
        }

        return res.status(201).json(produto)
    }

    async addProdutoSync(req, res) {
        if (!req.userAdmin) {
            return res.status(401).json({ error: "permitido apenas para administradores" })
        }
        const { codigo_produto, codigo_barras, nome, id_grupo, id_sessao, principio } = req.body;

        const sql = `insert into produtos (id, codigo_barras, nome, principio, id_grupo, id_sessao, created_at, updated_at) 
                                           values (:idProduto, :codigoBarras, :nome, :principio, :id_grupo, :id_sessao, now(), now()) `;
        const prod = await Produto.sequelize.query(sql, {
            type: QueryTypes.INSERT,
            replacements: {
                idProduto: codigo_produto,
                codigoBarras: codigo_barras,
                nome,
                principio,
                id_grupo,
                id_sessao
            }
        })

        if (!prod) {
            return res.status(400).json({ error: "Erro ao inserir o produto!" })
        }

        return res.status(200).json(prod)
    }

    async update(req, res) {
        if (!req.userAdmin) {
            return res.status(401).json({ error: "permitido apenas para administradores" })
        }

        const { id } = req.params;
        const { codigo_barras, nome, principio, id_grupo, id_sessao, codigo_produto, img_id, descricao } = req.body;

        const sqlUpdate = `update produtos set codigo_barras = :codigo_barras, nome = :nome, principio = :principio, id_grupo=:id_grupo, 
                                                 id_sessao=:id_sessao, updated_at=now() where id = :idProduto`

        const produto = await Produto.sequelize.query(sqlUpdate, {
            type: QueryTypes.UPDATE,
            replacements: {
                codigo_barras,
                nome,
                principio,
                id_grupo,
                id_sessao,
                idProduto: id, 
                img_id, 
                descricao
            }
        })

        if (!produto) {
            return res.status(400).json({ error: "Não alterei produto" })
        }
        return res.status(200).json(produto)
    }

    async updateRetaguarda(req, res) {
        if (!req.userAdmin) {
            return res.status(401).json({ error: "permitido apenas para administradores" })
        }

        const { id } = req.params;

        const produto = await Produto.findOne({where:{id}})

        const resp = await produto.update(req.body)

        if (!resp) {
            return res.status(400).json({ error: "Não alterei produto" })
        }
        return res.status(200).json(resp)
    }

}
export default new ProdutoController()