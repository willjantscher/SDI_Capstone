const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userQueries = require('./userQueries')
const taskerInQueries = require('./taskerInQueries')
const taskerCreationQueries = require('./taskerCreationQueries')
const sentQueries = require('./taskerOutQueries')
const loginQueries = require('./loginQueries')
const notificationQueries = require('./notificationQueries')

const app = express()
const port = 3001

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
 
app.options('*', cors())

app.use(bodyParser.json())

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cookieParser())

app.get('/users', userQueries.getAllUsers)


app.get('/unit_names', taskerCreationQueries.getAllUnitNames)
app.get('/units_info', taskerCreationQueries.getAllUnitsInfo)
app.get('/taskers', taskerCreationQueries.getAllTaskers)
app.get('/tasker_version', taskerCreationQueries.getAllTaskerVersion)
app.get('/units_assigned_taskers', taskerCreationQueries.getAllUnitsAssignedTaskers)
app.post('/taskers', (request, response) => taskerCreationQueries.postTasker(request, response))
app.post('/tasker_version', (request, response) => taskerCreationQueries.postTaskerVersion(request, response))
app.post('/units_assigned_taskers', (request, response) => taskerCreationQueries.postUnitsAssignedTaskers(request, response))

app.get('/mytaskers/:id', sentQueries.taskers)
app.get('/myresponses/:id', sentQueries.responses)
app.post('/editmytasker', sentQueries.edit)
app.delete('/deleteTasker/:tid', sentQueries.deleteTasker)

app.post('/login/authenticate', loginQueries.authenticateUser)
app.post('/login/register', loginQueries.registerUser)
app.get('/login/user/:id', loginQueries.getUser)
app.post('/login/change_password', loginQueries.changePassword)
app.post('/login/change_user_unit', loginQueries.changeUserUnit)

app.get('/inbox/taskers/:unitId', taskerInQueries.getIncomingTaskers);
app.get('/inbox/taskers/originators/:unitId', taskerInQueries.getTaskerOriginators);
app.post('/inbox/taskers/:unitId/:taskerId', taskerInQueries.updateTaskerResponse);
app.post('/inbox/notify', taskerInQueries.notifyOriginatorOfResponse);

app.get('/notifications', notificationQueries.getAllNotifications)
app.get('/notifications/:id', notificationQueries.myNotifications)
app.post('/notifications', (request, response) => taskerCreationQueries.postToNotifications(request,response))
app.post('/notifications/:id', (request, response) => notificationQueries.markAsRead(request,response))
app.delete('/notifications/:id', (request, response) => notificationQueries.notificationDelete(request, response))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
//test connection
function ping(req, res) {
    return res.send('pong');
}