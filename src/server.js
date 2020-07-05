import app from './app';

app.listen(3000, () => {
   console.log(`enviroment: ${process.env.APP_ENV}`)
   console.log(`estamos online na porta 3000`)
});
