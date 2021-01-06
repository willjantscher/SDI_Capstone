const pool = require('./pool.js').getPool()
const bcrypt = require('bcrypt')

const authenticateUser = async (request, response) => {
  let { username, passphrase } = request.body;

  pool.query(
    'SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if(err){
        throw err;
      }
      if(results.rows.length > 0){
        const user = results.rows[0];
        bcrypt.compare(passphrase, user.passphrase, (err, isMatch) => {
          if(err){
            throw err;
          }
          if(isMatch){
            console.log("authenticated")
            response.status(200).json(results.rows)
          } else{
            console.log("incorrect password")
            response.status(401).send("incorrect password")
        }})
      } else {
        console.log("username not found")
        response.status(404).send("username not found")
      }
    })
}

module.exports = {
    authenticateUser
}