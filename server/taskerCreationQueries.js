const pool = require('./pool.js').getPool()

const getAllUnitNames = (request, response) => {
    pool.query('SELECT unit_name FROM units', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows.map(unit => unit.unit_name))
    })
}

module.exports = {
    getAllUnitNames,
}