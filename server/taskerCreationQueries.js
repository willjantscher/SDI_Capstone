const pool = require('./pool.js').getPool()

// GET Queries ------------------------------------------------------------------------------------------------------------
const getAllUnitNames = (request, response) => {
    pool.query('SELECT unit_name FROM units', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows.map(unit => unit.unit_name))
    })
}
const getAllTaskers = (request, response) => {
    pool.query('SELECT * FROM taskers', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


// POST Queries ------------------------------------------------------------------------------------------------------------
const postTasker = (request, response) => {
    const tasker = request.body;
    console.log(tasker)
    pool.query('INSERT INTO taskers (originator_unit_id) VALUES ($1) RETURNING id', [tasker.originator_unit_id], function(error, results) {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0].id)
    })
}



module.exports = {
    getAllUnitNames,
    getAllTaskers,
    postTasker,
}