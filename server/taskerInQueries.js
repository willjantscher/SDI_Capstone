const pool = require('./pool.js').getPool();

const getIncomingTaskers = (request, response) => {
  pool.query(
    'SELECT units_assigned_taskers.tasker_id, \
      tasker_version.priority_lvl, \
      tasker_version.suspense_date, \
      tasker_version.tasker_name, \
      tasker_version.predicted_workload, \
      units_assigned_taskers.unit_id, \
      tasker_version.desc_text, \
      units_assigned_taskers.response, \
      tasker_version.updated_on, \
      units_assigned_taskers.current_status, \
      units_assigned_taskers.responded_on \
    FROM units_assigned_taskers \
    INNER JOIN tasker_version ON units_assigned_taskers.tasker_id = tasker_version.tasker_id \
    WHERE unit_id = $1',
    [request.params.unitId], (error, result) => {
      if (error) {
        response.sendStatus(500);
        throw error;
      }
      response.status(200).json(result.rows);
  });
}

const getTaskerOriginators = (request, response) => {
  pool.query(
    'SELECT taskers.originator_unit_id, units_assigned_taskers.tasker_id, units.unit_name FROM taskers \
    INNER JOIN units_assigned_taskers ON units_assigned_taskers.tasker_id = taskers.id \
    INNER JOIN units ON units_assigned_taskers.unit_id = units.id \
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
  const { unitId, taskerId } = request.params;
  const tasker = request.body;
  pool.query(
    'UPDATE units_assigned_taskers SET \
      response = $4, \
      current_status = $3, \
      actual_workload = $5, \
      responded_on = $6 \
    WHERE unit_id = $1 AND tasker_id = $2 \
    RETURNING *',
    [
      unitId,
      taskerId,
      "completed",
      tasker.response,
      tasker.actual_workload,
      tasker.responded_on,
    ],
    (error, result) => {
      if (error) {
        response.sendStatus(500);
        throw error;
      }
      response.status(200).json(result.rows);
  });
}

const notifyOriginatorOfResponse = (request, response) => {
  const tasker = request.body;
  pool.query(
    `INSERT INTO notifications (unit_to, details, isRead, tasker_id) VALUES ($1, $2, $3, $4)`,
    [tasker.unit_to, tasker.details, tasker.isread, tasker.tasker_id],
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
    updateTaskerResponse,
    notifyOriginatorOfResponse,
    getTaskerOriginators,
}