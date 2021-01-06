import React from "react";
import TaskerItem from './TaskerItem';

class TaskerList extends React.Component {
  render() {
    return(
        <table>
          <thead>
            <tr>
              <td></td>
              <td>ID</td>
              <td>Priority</td>
              <td>Suspense</td>
              <td>Name</td>
              <td>Est. Workload</td>
            </tr>
          </thead>
          <tbody>
            {this.props.taskers.map(tasker => <TaskerItem key={`TaskerItem${tasker.tasker_id}`} tasker={tasker} showDetails={this.props.showDetails}/>)}
          </tbody>
        </table>
    );
  }
}


export default TaskerList;