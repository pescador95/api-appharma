import Mensagem from '../models/Mensagem'

class Msg {
   async show(req, res){
      try{  
         const lista = await Mensagem.findAll()
         return res.json(lista)
      } catch(e){
         return res.status(400).json({error:e.message})
      }
   }
   async index(req, res){
      const id = req.params.id;
      try{  
         const msg = await Mensagem.findByPk(id)
         if(!msg){
            return res.status(400).json({error:'mensagem não existe!'})
         }
         return res.json(msg)
      } catch(e){
         return res.status(400).json({error:e.message})
      }
   }

   async store(req, res){ 
    if (!req.userAdmin){
        return res.json({error:"Você não é administrador."})
     }
      try{
         const msg = await Mensagem.create(req.body)
         res.json(msg)
      } catch (e){
         console.log(e.error);
         res.status(400).json({error:e.error})
      }
   }
   async update(req, res){ 
    if (!req.userAdmin){
        return res.json({error:"Você não é administrador."})
     }
      const id = req.params.id;
      try{
         const msg = await Mensagem.findByPk(id)
         if (!msg){
            return res.status(400).json({error:'mensagem não encontrada'})
         }

         await msg.update(req.body)
         res.json(msg)
      } catch (e){
         console.log(e.error);
         res.status(400).json({error:e.error})
      }
   }
}

export default new Msg()