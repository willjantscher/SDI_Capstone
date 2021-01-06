const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const notificationQueries = require('./notificationQueries')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)

app.get('/notifications', notificationQueries.getAllNotifications)

app.get('/notifications/:id', notificationQueries.myNotifications)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}