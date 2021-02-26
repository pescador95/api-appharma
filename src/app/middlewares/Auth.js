import jwt from 'jsonwebtoken'
import { promisify } from "util"

export default async (req, res, next) => {

   const auth = req.headers.auth;


   if (!auth) {
      return res.status(400).json({ error: "Token invalido" })
   }

   const [, token] = auth.split(" ")

   try{
      const payload = await promisify(jwt.verify)(token, process.env.SECRET)
   
      req.userId = payload.id
      req.userName = payload.name
      req.userAdmin = payload.admin
      req.superAdmin = payload.superadmin
      next()

   } catch (error) {
      return res.status(400).json({ error: "Token invalido" })
   }


}