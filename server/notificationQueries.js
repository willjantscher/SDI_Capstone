const pool = require('./pool.js').getPool()

const getAllNotifications = (request, response) => {
    pool.query('SELECT * FROM notifications;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const myNotifications = (request, response) => {
    var myUnit = request.params.id;
    pool.query('SELECT details FROM notifications WHERE unit_to = $1;', [myUnit], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getAllNotifications,
    myNotifications
}