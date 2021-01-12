const express = require('express')
const bodyParser = require('body-parser')
var multer = require('multer');

const cookieParser = require('cookie-parser')
const cors = require('cors')

const userQueries = require('./userQueries')
const taskerInQueries = require('./taskerInQueries')
const taskerCreationQueries = require('./taskerCreationQueries')
const sentQueries = require('./taskerOutQueries')
const loginQueries = require('./loginQueries')
const notificationQueries = require('./notificationQueries');

const pool = require('./pool.js').getPool()


var app = express()

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(upload.array()); 
app.use(express.static('public'));

const port = 3001

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
 
app.options('*', cors())



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

// for adding files
app.get('/', function(req, res){
  res.render('form');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  


// adding files stuff -------------------------------------------------------------------------------------------------------------------------------------

var upload = multer({ storage: storage }).single('file')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
         var columnDataToInsert = '\\x' + req.file.buffer.toString('hex');
         pool.query('INSERT INTO tasker_sent_attachments (tasker_id, fileData) VALUES ($1, $2)', [ '1', columnDataToInsert ],  function(error, results) {
          if (error) {
            throw error
        }
        return res.status(200).json(`${req.file.originalname} uploaded`)
         })
        //  console.log(req.file)
  })

});


app.get('/upload', function(req, res) {
  pool.query('SELECT * FROM tasker_sent_attachments', (error, results) => {
    // console.log(results.rows)
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
    // 
})
})