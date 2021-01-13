import React from "react";
import TaskerList from './TaskerList';
import Cookies from 'universal-cookie';
import isAuthed from '../login/utils';
import TaskerResponseForm from "./TaskerResponseForm";

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
        selectedRow: [],
    }
  }

  componentDidMount = async() => {
    // get user authentication info
    const cookies = new Cookies();
    const user_id = cookies.get("user_id");  //cookie name is user_id
    const unit_id = cookies.get("unit_id");  //cookie name is unit_id

    if (isAuthed()) {
      // get other data based on user unit
      const taskers = await this.fetchTaskers(unit_id);
      const originators = await this.fetchOriginators(unit_id);
      let selectedTasker = {};
      if(this.props.location.state) {
        const selectedTaskerId = parseInt(this.props.location.state.tasker_id);
        selectedTasker = taskers.find(tasker => tasker.tasker_id === selectedTaskerId);
        // don't let the people view tasker responses they have received from the inbox
        if (selectedTasker === undefined) {
          selectedTasker = {};
        }
      }

      this.setState({
        unitId: unit_id,
        userId: user_id,
        taskers: taskers,
        originators: originators,
        selectedTasker: selectedTasker,
      });
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

  handleTaskerClick = (e) => {
    const selectedRow = e.currentTarget;
    const selectedId = parseInt(selectedRow.id);
    const selectedTasker = this.state.taskers.find(tasker => tasker.tasker_id === selectedId);
    this.setState({selectedRow: selectedRow, selectedTasker: selectedTasker});
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
      return originator.tasker_id === tasker_id
    });

    // build notification payload
    const notification = {
      unit_to: originator.originator_unit_id,
      details: `You have received a response on Tasker ${updatedTasker.tasker_id} from Unit ${this.state.unitId}`,
      isread: false,
      tasker_id: updatedTasker.tasker_id,
      notification_type: 'response',
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1"/>
          <div className="col-sm">
            <TaskerList
              taskers={this.state.taskers}
              selectedRow={this.state.selectedRow}
              showDetails={this.handleTaskerShowDetails}
              onRowClick={this.handleTaskerClick}
            />
          </div>
          <div className="col-sm-1"/>
        </div>
        <div className="row">
          <div className="col-sm-1"/>
          <div className="col">
            <p className="mx-3 my-3">{this.state.selectedTasker.desc_text}</p>
          </div>
          <div className="col-sm-1"/>
        </div>
        <div className="row">
          <div className="col-sm-1"/>
          <div className="col">
            {Object.keys(this.state.selectedTasker).length > 0
            ? <TaskerResponseForm
                onSubmit={this.handleResponseSubmit}
                defaultValue={this.state.selectedTasker.response}
              />
            : <div/>}
          </div>
          <div className="col-sm-1"/>
        </div>
      </div>
    );
  }
}

export default TaskerInboxMain;