const express = require('express')
const bodyParser = require('body-parser')
const userQueries = require('./userQueries')
const taskerInQueries = require('./taskerInQueries')
const taskerCreationQueries = require('./taskerCreationQueries')
const sentQueries = require('./taskerOutQueries')
const loginQueries = require('./loginQueries')
const notificationQueries = require('./notificationQueries')

const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001

app.options('*', cors())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/users', userQueries.getAllUsers)


app.get('/unit_names', taskerCreationQueries.getAllUnitNames)
app.get('/taskers', taskerCreationQueries.getAllTaskers)
app.get('/tasker_version', taskerCreationQueries.getAllTaskerVersion)
app.get('/units_assigned_taskers', taskerCreationQueries.getAllUnitsAssignedTaskers)
app.post('/taskers', (request, response) => taskerCreationQueries.postTasker(request, response))
app.post('/tasker_version', (request, response) => taskerCreationQueries.postTaskerVersion(request, response))
app.post('/units_assigned_taskers', (request, response) => taskerCreationQueries.postUnitsAssignedTaskers(request, response))

app.get('/mytaskers/:id', sentQueries.taskers)
app.get('/myresponses/:id', sentQueries.responses)

app.post('/authenticate', loginQueries.authenticateUser)

app.get('/inbox/taskers/:unitId', taskerInQueries.getIncomingTaskers);
app.put('/inbox/taskers/:unitId/:taskerId', taskerInQueries.updateTaskerResponse);

app.get('/notifications', notificationQueries.getAllNotifications)
app.get('/notifications/:id', notificationQueries.myNotifications)
app.post('/notifications', (request, response) => taskerCreationQueries.postToNotifications(request,response))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}