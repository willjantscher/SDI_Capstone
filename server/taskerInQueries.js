const pool = require('./pool.js').getPool()

const getIncomingTaskers = (request, response) => {
  pool.query(
    'SELECT * FROM units_assigned_taskers INNER JOIN tasker_version \
      ON units_assigned_taskers.tasker_id = tasker_version.tasker_id \
      WHERE unit_id = $1',
    [request.params.id], (error, result) => {
      if (error) {
          throw error;
      }
      response.status(200).json(result.rows);
  });
}

module.exports = {
    getIncomingTaskers
}