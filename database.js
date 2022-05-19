const _knex = require("knex");

// knex connection
let knex = _knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "testdb",
    },
});

module.exports = knex;