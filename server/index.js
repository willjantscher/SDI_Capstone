const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const taskerInQueries = require('./taskerInQueries')

const app = express()
const port = 3001

const cors = require('cors');
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)

app.get('/inbox/taskers/:id', taskerInQueries.getIncomingTaskers);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}