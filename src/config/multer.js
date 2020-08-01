import multer from 'multer'
import crypto from 'crypto'

import { extname, resolve} from 'path'

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..',  'tmp', 'uploads'),
      fileFilter: function (req, file, callback) {
         var ext = path.extname(file.originalname);
         console.log("estou testeando essa ext: "+ext);
         if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
             return callback(new Error('Only images are allowed'))
         }
         callback(null, true)
     },
     limits:{
         fileSize: 1024 * 1024
     },
      filename: (req, fil, cb) =>{
         crypto.randomBytes(16, (err, res) =>{
            if(err) return cb(err)

            return cb(null, res.toString('hex') + extname(fil.originalname))
         })

      }
   })
}