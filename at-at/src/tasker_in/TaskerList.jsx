import React from "react";
import TaskerItem from './TaskerItem';

class TaskerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingMode: "predicted_workload",
      sortDescending: false
    };
    this.headers = {
      'ID': 'tasker_id',
      'Priority': 'priority_lvl',
      'Suspense': 'suspense_date',
      'Name': 'tasker_name',
      'Est. Workload': 'predicted_workload',
    };
    this.priorities = ['high', 'medium', 'low'];
  }

  sortPriority = (a, b) => {
    const aVal = this.priorities.indexOf(a);
    const bVal = this.priorities.indexOf(b);
    return aVal - bVal;
  }

  isSelectedClassName = (tasker) => {
    const rowId = tasker.tasker_id;
    const isSelected = (rowId === this.props.selectedRow.id);
    return isSelected ? "selected" : "";
  }

  handleClickColumnHeader = (e) => {
    const selectedHeader = e.target.textContent;
    const sortKey = this.headers[selectedHeader];
    let sortDescending = false;
    if (sortKey === this.state.sortingMode) {
      sortDescending = !this.state.sortDescending;
    }
    this.setState({sortingMode: sortKey, sortDescending: sortDescending});
  }

  generateColumnHeaders = () => {
    return (
      Object.keys(this.headers).map(headerName => {
        return (
          <th
            key={headerName}
            onClick={this.handleClickColumnHeader}
          >
          {headerName}
          </th>
        );
      })
    );
  }

  generateTaskerItems = (taskerArray) => {
    taskerArray.sort((taskerA, taskerB) => {
      const sortKey = this.state.sortingMode;
      let a = taskerA[sortKey].toString().toLowerCase();
      let b = taskerB[sortKey].toString().toLowerCase();
      if (sortKey === this.headers['Priority']) {
        return this.sortPriority(a, b);
      }
      if(a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    })

    if (this.state.sortDescending) {
      taskerArray.reverse();
    }

    const taskerItems = taskerArray.map(tasker => {
      return (
        <TaskerItem
          key={`TaskerItem${tasker.tasker_id}`}
          id={tasker.tasker_id}
          tasker={tasker}
          showDetails={this.props.showDetails}
          onClick={this.props.onRowClick}
          selected={this.isSelectedClassName(tasker)}
        />
      )
    })

    return taskerItems;
  }

  render() {
    return(
        <table className="rux-table">
          <thead>
            <tr>
              {this.generateColumnHeaders()}
            </tr>
          </thead>
          <tbody>
            {this.generateTaskerItems(this.props.taskers)}
          </tbody>
        </table>
    );
  }
}


export default TaskerList;