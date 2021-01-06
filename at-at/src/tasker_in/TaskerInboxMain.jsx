import React from "react";
import TaskerList from './TaskerList';

class TaskerInboxMain extends React.Component {
  constructor(props) {
    super(props);
    this.apiURL = 'http://localhost:3001';
    this.state = {
        unitId: 16,
        taskers: [],
        selectedTasker: {},
    }
  }

  componentDidMount = async() => {
    let response = await fetch(`${this.apiURL}/inbox/taskers/${this.state.unitId}`, {method: 'GET'})
    const taskers = await response.json();
    this.setState({taskers: taskers});
  }

  handleTaskerShowDetails = (e) => {
    const selectedTasker = this.state.taskers.find(tasker => tasker.tasker_id === parseInt(e.target.id));
    this.setState({selectedTasker: selectedTasker});
  }

  render() {
    return(
      <div>
          <TaskerList taskers={this.state.taskers} showDetails={this.handleTaskerShowDetails}/>
          <p>{this.state.selectedTasker.desc_text}</p>
      </div>
    );
  }
}

export default TaskerInboxMain;