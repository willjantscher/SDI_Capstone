import React from "react";
import { DateTime } from 'luxon';

class TaskerItem extends React.Component {
  render() {
    const { 
      tasker_id, 
      priority_lvl, 
      suspense_date, 
      tasker_name, 
      predicted_workload 
    } = this.props.tasker;
    
    const localSuspense = DateTime.fromISO(suspense_date, {zone: 'utc'});
    
    return(
      <tr className={this.props.selected} id={this.props.id} onClick={this.props.onClick}>
        <td>{tasker_id}</td>
        <td>{priority_lvl}</td>
        <td>{localSuspense.toLocaleString()}</td>
        <td>{tasker_name}</td>
        <td>{predicted_workload}</td>
      </tr>
    );
  }
}


export default TaskerItem;