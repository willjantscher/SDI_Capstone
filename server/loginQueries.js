const pool = require('./pool.js').getPool()
const crypto = require('crypto'); 

const registerUser = async (request, response) => {
  let { unit_id, username, passphrase, first_name, last_name } = request.body;
  let salt = crypto.randomBytes(16).toString('hex');
  let hash = crypto.pbkdf2Sync(passphrase, salt,  
    1000, 64, `sha512`).toString(`hex`);
  
  pool.query(
    'SELECT id FROM users WHERE username = $1',
    [username],
    (err, results) => {
      if(err) {
        throw err;
      }
      if(results.rows.length > 0){
        response.status(401).send("username taken")
      } else {
        pool.query(
          'INSERT INTO users (unit_id, username, passphrase, salt, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, unit_id, first_name, last_name',
          [unit_id, username, hash, salt, first_name, last_name],
          (err,results) => {
            if(err){
              throw err;
            }
            const user = results.rows[0];
            response.cookie('user_id', user.id)
            response.cookie('unit_id', user.unit_id)
            response.status(200).json(user)
        })
      }
    })
}

const authenticateUser = async (request, response) => {
  let { username, passphrase } = request.body;

  pool.query(
    'SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if(err){
        throw err;
      }
      if(results.rows.length > 0){
        const user = results.rows[0];
        let user_salt = user.salt;
        let user_hash = user.passphrase;
        let user_id = user.id;
        let unit_id = user.unit_id;
        
        let input_hash = crypto.pbkdf2Sync(passphrase,  
          user_salt, 1000, 64, `sha512`).toString(`hex`);
        
        if(user_hash === input_hash){
          console.log("authenticated")
          response.cookie('user_id', user_id)
          response.cookie('unit_id', unit_id)
          response.status(200).json(user)
        } else{
          console.log("incorrect password")
          response.status(401).send("incorrect password")
        }
      } else {
        console.log("username not found")
        response.status(404).send("username not found")
      }
    })
}

module.exports = {
    authenticateUser,
    registerUser
}