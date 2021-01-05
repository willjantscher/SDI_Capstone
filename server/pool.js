const Pool = require('pg').Pool
const pool = new Pool({
  user: 'akbar',
  host: 'localhost',///////////NEED TO CHANGE THIS ONCE DOCKER FIGURED OUT
  database: 'at_at',
  password: 'itsATrap',
  port: 5432, //postgres database port
})

module.exports = {
    getPool: () => pool
};