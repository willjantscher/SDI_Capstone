const pool = require('./pool.js').getPool()

const getIncomingTaskers = (request, response) => {
  pool.query(
    'SELECT * FROM units_assigned_taskers INNER JOIN tasker_version \
      ON units_assigned_taskers.tasker_id = tasker_version.tasker_id \
      WHERE unit_id = $1',
    [request.params.unitId], (error, result) => {
      if (error) {
        response.sendStatus(500);
        throw error;
      }
      response.status(200).json(result.rows);
  });
}

const updateTaskerResponse = (request, response) => {
  pool.query(
    'UPDATE units_assigned_taskers SET response = $3, current_status = $4 WHERE unit_id = $1 AND tasker_id = $2 RETURNING *',
    [request.params.unitId, request.params.taskerId, request.body.response, "completed"],
    (error, result) => {
      if (error) {
        response.sendStatus(500);
        throw error;
      }
      response.status(200).json(result.rows);
  });
}

module.exports = {
    getIncomingTaskers,
    updateTaskerResponse
}