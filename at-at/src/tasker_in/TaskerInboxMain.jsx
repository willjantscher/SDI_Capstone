import React from "react";
import TaskerList from './TaskerList';
import Cookies from 'universal-cookie';
import isAuthed from '../login/utils';
import { DateTime } from 'luxon';

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
    //get all the navbar tabs, deselect all, then select tasker inbox tab
    let tabs = Array.from(document.querySelectorAll('rux-tab'))
    tabs.forEach((tab) => tab.selected = false)
    tabs[3].selected = true

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
    let selectedRow = e.currentTarget;
    const selectedId = parseInt(selectedRow.id);
    let selectedTasker = this.state.taskers.find(tasker => tasker.tasker_id === selectedId);
    // toggle selection
    if (this.state.selectedTasker === selectedTasker) {
      selectedRow = [];
      selectedTasker = {};
    }
    this.setState({selectedRow: selectedRow, selectedTasker: selectedTasker});
  }

  handleResponseSubmit = async(e) => {
    e.preventDefault();
    // isolate data entered into text area
    const responseText = document.getElementById("taskerResponseData").value;
    const responseWorkload = document.getElementById("taskerResponseWorkload").value;
    const now = DateTime.utc();

    // build payload
    const taskerResponse = {
      "response": responseText,
      "actual_workload": responseWorkload,
      "responded_on": now,
    };

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
      details: `You have received a response on Tasker "${updatedTasker.tasker_name}" from ${originator.unit_name}`,
//    details: `You have received a response on Tasker ${updatedTasker.tasker_id} from Unit ${this.state.unitId}`,
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
      <div>
          <h1 className="pl-4 pb-4 pt-2">Upcoming Taskers</h1>
            <TaskerList
              taskers={this.state.taskers}
              selectedRow={this.state.selectedRow}
              onRowClick={this.handleTaskerClick}
              onSubmitResponse={this.handleResponseSubmit}
              defaultValueResponse={this.state.selectedTasker.response}
            />
      </div>
    );
  }
}

export default TaskerInboxMain;