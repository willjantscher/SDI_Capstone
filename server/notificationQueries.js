const pool = require('./pool.js').getPool()

const getAllNotifications = (request, response) => {
 //   pool.query('SELECT details FROM notifications; UPDATE notifications SET isRead = true;', (error, results) => {
    pool.query('SELECT details FROM notifications', (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).json(results.rows.map(notification => notification.details))
    })
}

const myNotifications = (request, response) => {
    var myUnit = request.params.id;
   // pool.query('SELECT details FROM notifications WHERE unit_to = $1; UPDATE notifications SET isRead = true WHERE unit_to = $1', [myUnit], (error, results) => {
    pool.query('SELECT details FROM notifications WHERE unit_to = $1', [myUnit], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows.map(notification => notification.details))
    })
}



module.exports = {
    getAllNotifications,
    myNotifications,
}