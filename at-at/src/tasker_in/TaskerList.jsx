import React from "react";
import { DateTime } from 'luxon';

class TaskerList extends React.Component {
  generateTaskerRow = () => {
    const { tasker_id, priority_lvl, suspense_date, tasker_name, predicted_workload } = this.props.taskers[0];
    const localSuspense = DateTime.fromISO(suspense_date, {zone: 'utc'});
    return (
      <tr>
        <td>{tasker_id}</td>
        <td>{priority_lvl}</td>
        <td>{localSuspense.toLocaleString()}</td>
        <td>{tasker_name}</td>
        <td>{predicted_workload}</td>
      </tr>
    );
  }

  render() {
    return(
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Priority</td>
              <td>Suspense</td>
              <td>Name</td>
              <td>Est. Workload</td>
            </tr>
          </thead>
          <tbody>
            {this.props.taskers.length > 0 ? this.generateTaskerRow() : <tr/>}
          </tbody>
        </table>
    );
  }
}


export default TaskerList;