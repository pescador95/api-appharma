import Address from '../models/UserAddress'

class AddressController {

   async show(req, res){
      const userId = req.userId
      try{
         const address = await Address.findAll({where:{id_user:userId}})
   
         if(!address){
            return res.status(400).json({error:"Não encontrei enderecos"})
         }
   
         return res.json(address)

      }catch(e){  
         console.log(e.message)
      }
   }

   async store(req, res){
      const userId = req.userId;
      const {rua, bairro, numero, cidade, uf, cep, complemento} = req.body
      try{
         const address = await Address.create({rua, numero, complemento, bairro, cidade, uf, cep, id_user:userId});
         if(!address){
            return res.status(400).json({error:"Não pude criar esse endereco"})
         }
         const {id} = address;
         return res.status(201).json({success:"endereco inserido com sucesso", address:{id, rua, numero, complemento, bairro, cidade, uf, cep}}) 
      }catch (e){
         console.log(e.message)
      }
   }

   async update(req, res){
      const {id} = req.params;
      const id_user = req.userId;
      const {rua, bairro, numero, cidade, uf, cep, complemento} = req.body
      try{
         const address = await Address.findOne({where: {id, id_user}})
         if(!address){
            return res.status(400).json({error:"Não encontrei o endereço!"})
         }
         address.update({rua, bairro, numero, cidade, uf, cep, complemento})
         return res.status(200).json({success:"Atualizado com sucesso", id}) 
      }catch (e){
         console.log(e.message)
      }
   }

   async delete(req, res){
      const {id} = req.params;
      const id_user = req.userId;
      try{
         const address = await Address.findOne({where: {id, id_user}})
         if(!address){
            return res.status(400).json({error:"Não encontrei o endereço!"})
         }
         address.destroy()
         return res.status(200).json({success:"deletado com sucesso", id}) 
      }catch (e){
         console.log(e.message)
      }
   }
}

export default new AddressController()