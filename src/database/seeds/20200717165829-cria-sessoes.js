
module.exports = {
   up: QueryInterface => {
     return QueryInterface.bulkInsert(
       "sessao",
       [
         {id:"641",descricao:"CONSUMO INTERNO LIMPEZA E HIGIENE",created_at:new Date(),updated_at:new Date()},
         {id:"71",descricao:"FORMULAS MANIPULAÇÕE",created_at:new Date(),updated_at:new Date()},
         {id:"771",descricao:"GENÉRICO INDICAÇÃO",created_at:new Date(),updated_at:new Date()},
         {id:"591",descricao:"GENERICOS POPULARES CONSAGRADOS",created_at:new Date(),updated_at:new Date()},
         {id:"571",descricao:"GENERICOS PROCURA ESPONTANEA",created_at:new Date(),updated_at:new Date()},
         {id:"721",descricao:"GENERICOS RECEITUÁRIO",created_at:new Date(),updated_at:new Date()},
         {id:"621",descricao:"MED ALOPATICOS FITOTERAPICOS",created_at:new Date(),updated_at:new Date()},
         {id:"451",descricao:"MED MARCA POPULARES CONSAGRADOS",created_at:new Date(),updated_at:new Date()},
         {id:"471",descricao:"MED MARCA SIMILARES (BONIF) EQUIVALENTES",created_at:new Date(),updated_at:new Date()},
         {id:"481",descricao:"MED MARCA SIMILARES (BONIF) INDICACAO FARMACEUTICA",created_at:new Date(),updated_at:new Date()},
         {id:"611",descricao:"MED MARCA SIMILARES (BONIF) PROCURA ESPONTANEA",created_at:new Date(),updated_at:new Date()},
         {id:"491",descricao:"MED MARCA SIMILARES POPULARES CONSAGRADOS",created_at:new Date(),updated_at:new Date()},
         {id:"431",descricao:"MED RECEIT REFERENCIA (ANVISA)",created_at:new Date(),updated_at:new Date()},
         {id:"441",descricao:"MED RECEIT SIMILARES (NAO BONIF)",created_at:new Date(),updated_at:new Date()},
         {id:"501",descricao:"PERFUMARIA E CORRELATOS HOSPITALARES E OFICINAIS",created_at:new Date(),updated_at:new Date()},
         {id:"711",descricao:"PERFUMARIA POPULARES CONSAGRADOS",created_at:new Date(),updated_at:new Date()},
         {id:"421",descricao:"PERFUMARIA RENDA",created_at:new Date(),updated_at:new Date()},
         {id:"521",descricao:"PERFUMARIA TRAFEGO",created_at:new Date(),updated_at:new Date()},
         {id:"121",descricao:"SERVIÇOES",created_at:new Date(),updated_at:new Date()},
         {id:"761",descricao:"TERMOLÁBEIS",created_at:new Date(),updated_at:new Date()},
         {id:"751",descricao:"TESTES RÁPIDOS",created_at:new Date(),updated_at:new Date()},
         {id:"581",descricao:"USO CONTINUO GENERICOS",created_at:new Date(),updated_at:new Date()},
         {id:"551",descricao:"USO CONTINUO POPULARES CONSAGRADOS",created_at:new Date(),updated_at:new Date()},
         {id:"461",descricao:"USO CONTINUO RECEITUARIO (SIMILARES NÃO BONIF.)",created_at:new Date(),updated_at:new Date()},
         {id:"661",descricao:"USO CONTINUO REFERENCIA (ANVISA)",created_at:new Date(),updated_at:new Date()},
         {id:"511",descricao:"USO CONTINUO SIMILARES (BONIF)",created_at:new Date(),updated_at:new Date()},
         {id:"411",descricao:"VACINAS",created_at:new Date(),updated_at:new Date()},
         {id:"0",descricao:"SEM SESSAO",created_at:new Date(),updated_at:new Date()}],
       {}
     );
   },
 
   down: () => {}
 };