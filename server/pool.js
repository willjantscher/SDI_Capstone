const Pool = require('pg').Pool
const pool = new Pool({
  user: 'akbar',
  host: 'database',
  database: 'at_at',
  password: 'itsATrap',
  port: 5432, //postgres database port
})

module.exports = {
    getPool: () => pool
};