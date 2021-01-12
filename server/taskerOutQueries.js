const pool = require('./pool.js').getPool()

const taskers = (request, response) => {
    var origUnitId = request.params.id
    pool.query(
        'SELECT tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text FROM tasker_version INNER JOIN taskers ON tasker_version.tasker_id = taskers.id WHERE taskers.originator_unit_id =$1;'
    ,[origUnitId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}

const deleteTasker = (request, response) => {
    var tid = request.params.tid
    pool.query('DELETE FROM taskers WHERE id=$1;'
    ,[tid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200)

    })
}
const responses = (request, response) => {
    var unitId = request.params.id
    pool.query(
        'SELECT tasker_id, unit_id, current_status, \
        response FROM units_assigned_taskers INNER JOIN \
        taskers ON units_assigned_taskers.tasker_id = taskers.id \
         WHERE taskers.originator_unit_id =$1;'
    ,[unitId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results.rows)
    })
}

const edit = (request, response) => {
    let { tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text } = request.body;

    pool.query(
        'UPDATE tasker_version SET tasker_id=$1, version_num = $2, \
        updated_on = $3, tasker_name = $4, suspense_date = $5, \
         priority_lvl = $6, predicted_workload = $7, desc_text = $8 WHERE tasker_id=$1;',
        [tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text], (error, results) => {
        if (error) {
            response.status(401)
        }
        response.status(200)

    })
}


exports.taskers = taskers;
exports.responses = responses;
exports.edit = edit;
exports.deleteTasker = deleteTasker;