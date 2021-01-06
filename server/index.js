const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const taskerInQueries = require('./taskerInQueries')

const app = express()
const port = 3001

const cors = require('cors');
app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)

app.get('/inbox/taskers/:unitId', taskerInQueries.getIncomingTaskers);
app.put('/inbox/taskers/:unitId/:taskerId', taskerInQueries.updateTaskerResponse);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}