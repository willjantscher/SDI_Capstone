import React from "react";
import TaskerList from './TaskerList';

class TaskerInboxMain extends React.Component {
  constructor(props) {
    super(props);
    this.apiURL = 'http://localhost:3001';
    this.state = {
        unitId: 17,
        taskers: [],
        selectedTasker: {},
    }
  }

  componentDidMount = async() => {
    const taskers = await this.fetchTaskers();
    this.setState({taskers: taskers});
  }

  fetchTaskers = async() => {
    let response = await fetch(`${this.apiURL}/inbox/taskers/${this.state.unitId}`, {method: 'GET'})
    const taskers = await response.json();
    return taskers;
  }

  handleTaskerShowDetails = (e) => {
    const selectedId = parseInt(e.target.id);
    const selectedTasker = this.state.taskers.find(tasker => tasker.tasker_id === selectedId);
    this.setState({selectedTasker: selectedTasker});
  }

  handleResponseSubmit = async(e) => {
    e.preventDefault();
    // isolate data entered into text area
    const formChildren = Array.from(e.target.children);
    const responseTextArea = formChildren.find(element => element.name === "taskerResponseData")
    const taskerResponse = {"response": responseTextArea.value};

    // build request data
    const { unit_id, tasker_id } = this.state.selectedTasker;
    const requestContent = {
      method: 'PUT',
      mode: 'cors',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(taskerResponse)
    };

    // send request and wait for response
    const response = await fetch(`${this.apiURL}/inbox/taskers/${unit_id}/${tasker_id}`, requestContent);
    const updatedTaskerData = await response.json();

    // update locally-stored tasker so that changes appear correctly
    const newTaskers = await this.fetchTaskers();
    const updatedTasker = {...this.state.selectedTasker, ...updatedTaskerData};
    this.setState({taskers: newTaskers, selectedTasker: updatedTasker});
  }

  render() {
    return(
      <div>
        <TaskerList taskers={this.state.taskers} showDetails={this.handleTaskerShowDetails}/>
        <p>{this.state.selectedTasker.desc_text}</p>
        {Object.keys(this.state.selectedTasker).length > 0
        ? <form onSubmit={this.handleResponseSubmit}>
            <textarea name="taskerResponseData" autoFocus={true} defaultValue={this.state.selectedTasker.response}/>
            <input type="submit" value="Submit" name="taskerResponseSubmitButton"/>
          </form>
        : <div/>}
      </div>
    );
  }
}

export default TaskerInboxMain;