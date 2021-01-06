const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const taskerCreationQueries = require('./taskerCreationQueries')

const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)
app.get('/unit_names', taskerCreationQueries.getAllUnitNames)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}