import React from "react";
import { DateTime } from 'luxon';

class TaskerItem extends React.Component {
  getResponseStatus = (statusStr, responseDate) => {
    let status = "";

    if (statusStr === "completed" && responseDate !== null) {
      const localRespondedDate = DateTime.fromISO(responseDate, {zone: 'utc'}).toLocaleString();
      status = `Completed on ${localRespondedDate}`
    } else {
      // capitalize the first letter so it looks a wee bit nicer
      status = `${statusStr.slice(0,1).toUpperCase()}${statusStr.slice(1,statusStr.length)}`;
    }
    return status;
  }

  render() {
    const { 
      tasker_id,
      priority_lvl,
      suspense_date,
      tasker_name,
      predicted_workload,
      updated_on,
      current_status,
      responded_on,
    } = this.props.tasker;
    
    const localSuspense = DateTime.fromISO(suspense_date, {zone: 'utc'});
    const localAssignedDate = DateTime.fromISO(updated_on, {zone: 'utc'});

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
        <td>{this.getResponseStatus(current_status, responded_on)}</td>
      </tr>
    );
  }
}


export default TaskerItem;