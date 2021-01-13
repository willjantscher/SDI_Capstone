import React from "react";
import TaskerItem from './TaskerItem';
import TaskerResponseForm from "./TaskerResponseForm";

class TaskerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingMode: "updated_on",
      sortDescending: false
    };
    // to change headers, likely have to update taskerInQueries to get more data
    this.headers = {
      'ID': 'tasker_id',
      'Name': 'tasker_name',
      'Assigned': 'updated_on',//FIXME:this must be updated if tasker versioning is implemented!
      'Suspense': 'suspense_date',
      'Priority': 'priority_lvl',
      'Est. Workload': 'predicted_workload',
      'Responded': 'current_status',
    };
    this.statuses = ['in progress', 'completed'];
    this.priorities = ['high', 'medium', 'low'];
  }

  sortPriority = (a, b) => {
    const aVal = this.priorities.indexOf(a);
    const bVal = this.priorities.indexOf(b);
    return aVal - bVal;
  }

  isSelected = (tasker) => {
    const rowId = tasker.tasker_id;
    const isSelected = (rowId === parseInt(this.props.selectedRow.id));
    return isSelected;
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
          onClick={this.props.onRowClick}
          selected={this.isSelected(tasker)}
        />
      )
    })

    const rows = [];
    for (let i = 0; i < taskerItems.length; i++) {
      const taskerItem = taskerItems[i];
      const tasker = taskerArray[i];
      const taskerForm = <TaskerResponseForm
          key={`TaskerInfo${tasker.tasker_id}`}
          tasker={tasker}
          selected={this.isSelected(tasker)}
          onSubmitResponse={this.props.onSubmitResponse}
          defaultValueResponse={this.props.defaultValueResponse}
      />;
      rows.push(taskerItem, taskerForm);
    }

    return rows;
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