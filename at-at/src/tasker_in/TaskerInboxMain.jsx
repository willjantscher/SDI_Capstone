import React from "react";
import TaskerList from './TaskerList';
import Cookies from 'universal-cookie';

class TaskerInboxMain extends React.Component {
  constructor(props) {
    super(props);
    this.apiURL = 'http://localhost:3001';
    this.state = {
        unitId: 0,
        userId: 0,
        taskers: [],
        originators: [],
        selectedTasker: {},
    }
  }

  componentDidMount = async() => {
    // get user authentication info
    let cookies = new Cookies();
    let user_id = cookies.get("user_id");  //cookie name is user_id
    let unit_id = cookies.get("unit_id");  //cookie name is unit_id

    if (unit_id !== undefined) {
      // get other data based on user unit
      const taskers = await this.fetchTaskers(unit_id);
      const originators = await this.fetchOriginators(unit_id);
      this.setState({unitId: unit_id, userId: user_id, taskers: taskers, originators: originators});
    }
  }

  fetchTaskers = async(unitId) => {
    const response = await fetch(`${this.apiURL}/inbox/taskers/${unitId}`, {method: 'GET'})
    const taskers = await response.json();
    return taskers;
  }

  fetchOriginators = async(unitId) => {
    const response = await fetch(`${this.apiURL}/inbox/taskers/originators/${unitId}`, {method: 'GET'})
    const originators = await response.json();
    return originators;
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
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(taskerResponse)
    };

    // send request and wait for response
    const response = await fetch(`${this.apiURL}/inbox/taskers/${unit_id}/${tasker_id}`, requestContent);
    const updatedTaskerData = await response.json();

    // update locally-stored tasker so that changes appear correctly
    const newTaskers = await this.fetchTaskers(this.state.unitId);
    const updatedTasker = {...this.state.selectedTasker, ...updatedTaskerData};

    // get destination for tasker notification
    const originator = this.state.originators.find(originator => {
      return originator.tasker_id === this.state.selectedTasker.tasker_id
    });

    // build notification payload
    const notification = {
      unit_to: originator.originator_unit_id,
      details: `You have received a response on Tasker ${updatedTasker.tasker_id} from Unit ${this.state.unitId}`,
      isread: false,
    }

    // send notification to originator
    fetch(`${this.apiURL}/inbox/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification)
    });

    alert("Tasker response submitted!");

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