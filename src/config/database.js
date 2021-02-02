
require('dotenv/config')

const dialect = process.env.APP_ENV === 'test' ? 'sqlite' : 'postgres'

module.exports = {
  dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging:  false, //dialect === 'sqlite' ? false : true ,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
  pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
};
 