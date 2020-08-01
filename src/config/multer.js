import multer from 'multer'
import crypto from 'crypto'

import { extname, resolve } from 'path'

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..',  'tmp', 'uploads'),
      filename: (req, fil, cb) =>{
         crypto.randomBytes(16, (err, res) =>{
            if(err) return cb(err)
            return cb(null, res.toString('hex') + extname(fil.originalname))
         })
      }
   }),
   fileFilter: function (req, file, callback) {
      if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/svg' && file.mimetype !== 'image/png') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
}