import React from "react";
import TaskerItem from './TaskerItem';

class TaskerList extends React.Component {
  constructor(props) {
    super(props);
  }

  isSelectedClassName = (tasker) => {
    const rowId = `TaskerItem${tasker.tasker_id}`;
    const isSelected = (rowId === this.props.selectedRow.id);
    return isSelected ? "selected" : "";
  }

  render() {
    return(
        <table className="rux-table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Priority</th>
              <th>Suspense</th>
              <th>Name</th>
              <th>Est. Workload</th>
            </tr>
          </thead>
          <tbody>
            {this.props.taskers.map(tasker => {
              return (
                <TaskerItem
                  key={`TaskerItem${tasker.tasker_id}`}
                  id={`TaskerItem${tasker.tasker_id}`}
                  tasker={tasker}
                  showDetails={this.props.showDetails}
                  onClick={this.props.onRowClick}
                  selected={this.isSelectedClassName(tasker)}
                />
              )
            })}
          </tbody>
        </table>
    );
  }
}


export default TaskerList;