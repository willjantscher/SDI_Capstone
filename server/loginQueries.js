const pool = require('./pool.js').getPool()
const crypto = require('crypto'); 

const registerUser = async (request, response) => {
  let { username, passphrase } = request.body;
  let salt = crypto.randomBytes(16).toString('hex');
  let hash = crypto.pbkdf2Sync(passphrase, salt,  
    1000, 64, `sha512`).toString(`hex`);
  console.log(typeof(salt))
  pool.query(
    'INSERT INTO users (unit_id, username, passphrase, salt, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6)',
    [1, username, hash, salt, "TestFirstName", "TestLastName"],
    (err,results) => {
      if(err){
        throw err;
      }
      response.status(200).send("registered")
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
        
        let input_hash = crypto.pbkdf2Sync(passphrase,  
          user_salt, 1000, 64, `sha512`).toString(`hex`);
        
        if(user_hash === input_hash){
          console.log("authenticated")
          response.cookie('username', username)
          response.status(200).json(results.rows)
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
    authenticateUser
}