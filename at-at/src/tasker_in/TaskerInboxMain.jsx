import React from "react";
import TaskerList from './TaskerList';

class TaskerInboxMain extends React.Component {
  constructor(props) {
    super(props);
    this.apiURL = 'http://localhost:3001';
    this.state = {
        unitId: 39,
        taskers: [],
    }
  }

  componentDidMount = async() => {
    let response = await fetch(`${this.apiURL}/inbox/taskers/${this.state.unitId}`, {method: 'GET'})
    const taskers = await response.json();
    this.setState({taskers: taskers});
  }

  render() {
    return(
        <div>
            I am inside of the Tasker Inbox Main page
            <TaskerList taskers={this.state.taskers}/>
        </div>
    );
  }
}

export default TaskerInboxMain;