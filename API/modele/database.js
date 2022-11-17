const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
    user: 'julien',
    host: 'localhost',
    database: 'projetSC',
    password: 'password',
    port: 5431,
});

module.exports = pool;