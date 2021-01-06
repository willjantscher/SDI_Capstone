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
    // console.log(tasker)
    pool.query('INSERT INTO taskers (originator_unit_id) VALUES ($1) RETURNING id', [tasker.originator_unit_id], function(error, results) {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0].id)
    })
}
const postTaskerVersion = (request, response) => {
    const tasker = request.body;
    console.log(tasker.updated_on)
    pool.query('INSERT INTO tasker_version (tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tasker.tasker_id, tasker.version_num, tasker.updated_on, tasker.tasker_name, tasker.suspense_date, tasker.priority_lvl, tasker.predicted_workload, tasker.desc_text], function(error, results) {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



module.exports = {
    getAllUnitNames,
    getAllTaskers,
    postTasker,
    postTaskerVersion,
}