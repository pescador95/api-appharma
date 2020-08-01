import multer from 'multer'
import crypto from 'crypto'

import { extname, resolve} from 'path'

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..',  'tmp', 'uploads'),
      fileFilter: function (req, file, cb) {
         if ((file.mimetype != 'image/jpeg') && (file.mimetype != 'image/png') && (file.mimetype != 'image/svg+xml') && (file.mimetype != 'image/png') ){
             return cb(new Error('Tipo de arquivo invalido'));
         }
         cb(null, true)
       },
      filename: (req, fil, cb) =>{
         crypto.randomBytes(16, (err, res) =>{
            if(err) return cb(err)

            return cb(null, res.toString('hex') + extname(fil.originalname))
         })

      }
   })
}