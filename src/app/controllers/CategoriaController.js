import Categoria from '../models/Categoria'
import Service from '../services/CategoriaService'

class CategoriaController {
   async store(req, res) {

      const { descricao } = req.body

      const categoria = await Categoria.create({ descricao })

      if (!categoria) {
         return res.status(400).json({ error: "Ocorreu um erro ao inserir a categoria" })
      }

      const { id } = categoria

      return res.json({ id, descricao })
   }

   async update(req, res) {
      if (!req.userAdmin) {
         return res.status(401).json({ error: "permitido apenas para administradores" })
      }
      try {
         const categoria = await Service.CategoriaExiste({ idCategoria: req.query.id })

         categoria.update(req.body)
         
         res.json(categoria)
      } catch (e) {
         res.status(400).json({ error: e.message })
      }
   }
}

export default new CategoriaController()