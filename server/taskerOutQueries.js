const pool = require('./pool.js').getPool()

const taskers = (request, response) => {
    var origUnitId = request.params.id
    pool.query(
        'SELECT * FROM tasker_version INNER JOIN taskers ON tasker_version.tasker_id = taskers.id WHERE taskers.originator_unit_id =$1;'
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
        'SELECT tasker_id, unit_id, current_status, response FROM units_assigned_taskers INNER JOIN taskers ON units_assigned_taskers.tasker_id = taskers.id WHERE taskers.originator_unit_id =$1;'
    ,[unitId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results.rows)
    })
}

// const edit = (request, response) => {
//     var unitId = request.params.id
//     pool.query(
//         'UPDATE tasker_version SET column1 = value1, column2 = value2, column3 = value3, column4 = value4, column5 = value5, column6 = value6 WHERE condition;',[unitId], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//         console.log(results.rows)
//     })
//}


exports.taskers = taskers;
exports.responses = responses;
//exports.edit = edit;