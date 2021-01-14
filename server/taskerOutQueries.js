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
    var vnum = request.params.vnum
    pool.query('DELETE FROM tasker_version WHERE tasker_id=$1 AND version_num=$2;'
    ,[tid, vnum], (error, results) => {
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
        'INSERT INTO tasker_version (tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text) \
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
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