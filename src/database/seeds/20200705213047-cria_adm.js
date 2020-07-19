const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          cpf: "04112527985",
          name: "Cesar",
          email: "admin@appharma.com",
          password_hash: bcrypt.hashSync("123456", 8),
          admin:true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};