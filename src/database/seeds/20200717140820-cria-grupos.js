
module.exports = {
   up: QueryInterface => {
     return QueryInterface.bulkInsert(
       "grupos",
       [
         {id:"11",descricao:"MEDICAMENTOS",created_at: new Date(), updated_at : new Date() },
         {id:"21",descricao:"PERFUMARIA",created_at: new Date(),updated_at:new Date()},
         {id:"31",descricao:"ESPECIAL",created_at:new Date(),updated_at:new Date()},
         {id:"41",descricao:"SERVICOS",created_at:new Date(),updated_at:new Date()},
         {id:"51",descricao:"PSICOTROPICOS GENERICOS",created_at:new Date(),updated_at:new Date()},
         {id:"61",descricao:"PSICOTROPICOS",created_at:new Date(),updated_at:new Date()},
         {id:"71",descricao:"SIMILARES",created_at:new Date(),updated_at:new Date()},
         {id:"81",descricao:"GENERICOS",created_at:new Date(),updated_at:new Date()},
         {id:"91",descricao:"MANIPULO - PREÇO MANUAL",created_at:new Date(),updated_at:new Date()},
         {id:"101",descricao:"PERFUMARIAS E CORRELATOS",created_at:new Date(),updated_at:new Date()},
         {id:"111",descricao:"MED MARCA RECEITUARIOS (ETICOS) E POPULARES ESPECI",created_at:new Date(),updated_at:new Date()},
         {id:"121",descricao:"MED SIMILARES (BONIF)",created_at:new Date(),updated_at:new Date()},
         {id:"131",descricao:"MED GENERICOS",created_at:new Date(),updated_at:new Date()},
         {id:"141",descricao:"MANIPULOS E HOMEOPATICOS",created_at:new Date(),updated_at:new Date()},
         {id:"151",descricao:"CONSUMO INTERNO DA FARMACIA",created_at:new Date(),updated_at:new Date()},
         {id:"161",descricao:"MED",created_at:new Date(),updated_at:new Date()},
         {id:"171",descricao:"TELE-ENTREGA",created_at:new Date(),updated_at:new Date()},
         {id:"181",descricao:"GENERICO",created_at:new Date(),updated_at:new Date()},
         {id:"191",descricao:"LIBERO",created_at:new Date(),updated_at:new Date()},
         {id:"201",descricao:"ETICO",created_at:new Date(),updated_at:new Date()},
         {id:"0",descricao:"SEM GRUPO",created_at:new Date(),updated_at:new Date()}
       ],
       {}
     );
   },
 
   down: () => {}
 };