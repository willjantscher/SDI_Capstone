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

// for adding files
app.get('/', function(req, res){
  res.render('form');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  


// handling file upload/download -------------------------------------------------------------------------------------------------------------------------------------
var upload = multer({ storage: storage }).single('file')
var stream = require('stream');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

app.post('/upload/:tasker_id',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
         var columnDataToInsert = '\\x' + req.file.buffer.toString('hex');
         pool.query('INSERT INTO tasker_sent_attachments (tasker_id, fieldname, originalname, encoding_, mimetype, buffer_, size) VALUES ($1, $2, $3, $4, $5, $6, $7)', [ req.params.tasker_id, req.file.fieldname, req.file.originalname, req.file.encoding, req.file.mimetype, columnDataToInsert, req.file.size ],  function(error, results) {
          if (error) {
            throw error
        }
        return res.status(200).json(`${req.file.originalname} uploaded`)
         })
        //  console.log(req.file)
  })

});

app.get('/attachments/:tasker_id', function(req, res) {
  console.log('recieved')
  pool.query('SELECT id, originalname, tasker_id FROM tasker_sent_attachments WHERE tasker_id = $1', [req.params.tasker_id], (error, results) => {
    if (error) {
      throw error
    }
    res.json(results.rows)
  })
})

app.get('/download/:attachment_id', function(req, res) {

  pool.query('SELECT * FROM tasker_sent_attachments WHERE id = $1',[req.params.attachment_id], (error, results) => {
    if (error) {
      console.log(err);
      res.json({msg: 'Error', detail: err});
      }
    const file = results.rows[0]

    var fileContents = Buffer.from(file.buffer_, "base64");
    // console.log(fileContents)

    var readStream = new stream.PassThrough();
    readStream.end(fileContents);
    
    res.set('Content-disposition', 'attachment; filename=' + file.originalname);
    res.set('Content-Type', file.mimetype);
 
    readStream.pipe(res);
  })
  }
)


app.get('/files_names', function(req, res) {
  pool.query('SELECT originalname, tasker_id FROM tasker_sent_attachments', (error, results)=> {
    if (error) {
      throw error
    }
    res.json(results.rows)
  })
})

app.get('/full_attachment_row', function(req, res) {
  pool.query('SELECT * from tasker_sent_attachments', (error, results) => {
    if (error) {
      throw error
    }
    res.json(results.rows[0])
  })
})