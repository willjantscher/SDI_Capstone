const pool = require('./pool.js').getPool()

const taskers = (request, response) => {
    var origUnitId = request.params.id
    pool.query(
        'SELECT DISTINCT tasker_id, unit_id,routing_at_unit_id,response, current_status, actual_workload, originator_unit_id FROM units_assigned_taskers INNER JOIN taskers ON units_assigned_taskers.tasker_id = taskers.originator_unit_id WHERE taskers.originator_unit_id = $1;'
    ,[origUnitId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const responses = (request, response) => {
    var unitId = request.params.id
    pool.query(
        'SELECT DISTINCT tasker_id, unit_id, current_status, response FROM units_assigned_taskers INNER JOIN taskers ON units_assigned_taskers.tasker_id = taskers.originator_unit_id WHERE taskers.originator_unit_id = $1;'
    ,[unitId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results.rows)
    })
}
exports.taskers = taskers;
exports.responses = responses;