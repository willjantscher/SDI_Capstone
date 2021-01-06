const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const sentQueries = require('./taskerOutQueries')
const loginQueries = require('./loginQueries')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)
app.get('/mytaskers/:id', sentQueries.taskers)
app.get('/myresponses/:id', sentQueries.responses)

app.post('/authenticate', loginQueries.authenticateUser)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}