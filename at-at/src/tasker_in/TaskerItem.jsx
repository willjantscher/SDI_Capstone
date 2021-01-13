import React from "react";
import { DateTime } from 'luxon';

class TaskerItem extends React.Component {
  render() {
    const { 
      tasker_id, 
      priority_lvl, 
      suspense_date, 
      tasker_name, 
      predicted_workload,
      updated_on,
    } = this.props.tasker;
    
    const localSuspense = DateTime.fromISO(suspense_date, {zone: 'utc'});
    const localAssignedDate = DateTime.fromISO(updated_on, {zone: 'utc'});
    const display = this.props.selected ? "none" : "table-row";

    return(
      <tr
        className={this.props.selected ? "selected" : ""}
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <td>{tasker_id}</td>
        <td>{tasker_name}</td>
        <td>{localAssignedDate.toLocaleString()}</td>
        <td>{localSuspense.toLocaleString()}</td>
        <td>{priority_lvl}</td>
        <td>{predicted_workload}</td>
      </tr>
    );
  }
}


export default TaskerItem;