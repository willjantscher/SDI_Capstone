const pool = require('./pool.js').getPool()

// GET Queries ------------------------------------------------------------------------------------------------------------
const getAllUnitNames = (request, response) => {
    pool.query('SELECT unit_name FROM units', (error, results) => {
        // console.log(results.rows)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows.map(unit => unit.unit_name))
        // 
    })
}
const getAllUnitsInfo = (request, response) => {
    pool.query('SELECT * FROM units', (error, results) => {
        // console.log(results.rows)
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        // .map(unit => unit.unit_name)
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
const getAllTaskerVersion = (request, response) => {
    pool.query('SELECT * FROM tasker_version', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getAllUnitsAssignedTaskers = (request, response) => {
    pool.query('SELECT * FROM units_assigned_taskers', (error, results) => {
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
const postTaskerVersion = (request, response) => {
    const tasker = request.body;
    pool.query('INSERT INTO tasker_version (tasker_id, version_num, updated_on, tasker_name, suspense_date, priority_lvl, predicted_workload, desc_text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tasker.tasker_id, tasker.version_num, tasker.updated_on, tasker.tasker_name, tasker.suspense_date, tasker.priority_lvl, tasker.predicted_workload, tasker.desc_text], function(error, results) {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const postUnitsAssignedTaskers = (request, response) => {
    const tasker = request.body;
    // console.log(tasker);
    let posts = [];
    for(let i = 0; i < tasker.sendToUnits.length; i ++) {
        posts.push([tasker.tasker_id, tasker.sendToUnits_ids[i], tasker.routing_at_unit_id, tasker.current_status])
    }
    // console.log(posts);

    let query = '';
    for(let item of posts) {
        query += 'INSERT INTO units_assigned_taskers (tasker_id, unit_id, routing_at_unit_id, current_status) VALUES (' + item[0] + ', ' + item[1] + ', ' + item[2] + `, '` + item[3] +`'); `
    }
    
    // console.log(query)

    pool.query(query, function(error, results) {
        if (error) {
            response.sendStatus(500)
            throw error
        }
        response.status(200).json('taskers distributed to units')
    })
}
const postToNotifications = (request, response) => {
    const tasker = request.body;
    // console.log(tasker)
    let posts = [];
    for(let i = 0; i < tasker.sendToUnits.length; i ++) {
        posts.push([tasker.sendToUnits_ids[i], `You have been assigned a ${tasker.priority_lvl} priority tasker with a suspence of ${tasker.suspense_date} and a predicted workload of ${tasker.predicted_workload} hours: ${tasker.tasker_name}`, false])
    }
    // console.log(posts)
    let query = '';
    for(let item of posts) {
        query += 'INSERT INTO notifications (unit_to, details, isRead) VALUES (' + item[0] + `, '` + item[1] + `', ` + item[2] + `); `
    }
    // console.log(query)
    pool.query(query, (error, results) => {
        if (error) {
            response.sendStatus(500)
            throw error
        }
        response.status(200).json('notifications posted')
    })
}



module.exports = {
    getAllUnitNames,
    getAllUnitsInfo,
    getAllTaskers,
    getAllUnitsAssignedTaskers,
    postTasker,
    postTaskerVersion,
    getAllTaskerVersion,
    postUnitsAssignedTaskers,
    postToNotifications
}


