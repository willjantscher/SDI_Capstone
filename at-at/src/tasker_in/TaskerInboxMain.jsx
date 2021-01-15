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
        attachments: [],
        originators: [],
        selectedTasker: {},
        selectedRow: [],
        selected_files: null,
        selected_files_num: 0,
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
      const attachments = await this.fetchAttachments(taskers.map(tasker => tasker.tasker_id))
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
        attachments: attachments,
      });
    }
  }

  fetchTaskers = async(unitId) => {
    const response = await fetch(`${this.apiURL}/inbox/taskers/${unitId}`, {method: 'GET'});
    const allTaskers = await response.json();
    const taskers = [];
    for (let tasker of allTaskers) {
      // get tasker if it is already in array
      const includedTasker = taskers.find(arrayTasker => arrayTasker.tasker_id === tasker.tasker_id);
      // if version of tasker is already in array
      // and the new tasker's version is greater than what's already in array
      console.log(includedTasker, tasker);
      if (includedTasker && (tasker.version_num > includedTasker.version_num)) {
          // replace that tasker with the newer version
          taskers[taskers.indexOf(includedTasker)] = tasker;
      } else {
        taskers.push(tasker);
      }
    }
    return taskers;
  }

  fetchOriginators = async(unitId) => {
    const response = await fetch(`${this.apiURL}/inbox/taskers/originators/${unitId}`, {method: 'GET'})
    const originators = await response.json();
    return originators;
  }

  fetchAttachments = async(taskerIds) => {
    const response = await fetch(`${this.apiURL}/attachments`, {method: 'GET'});
    const attachments = await response.json();
    const unitAttachments = attachments.filter(attachment => taskerIds.includes(attachment.tasker_id));
    return unitAttachments;
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

    // store attachments
    await this.uploadFiles(updatedTaskerData[0].id);

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
  
  handleFileInputChange = (e) => {
    this.setState({ selected_files_num : e.target.files.length })
    this.setState({ selected_files : e.target.files })
  }

  uploadFiles = (units_assigned_taskers_id) => {
    //this is dumb
    if(this.state.selected_files !== null) {
      for(var i = 0; i < this.state.selected_files.length; i++) {
        const formData = new FormData();
        formData.append('file', this.state.selected_files[i]);
        fetch(`${this.apiURL}/upload_response/${units_assigned_taskers_id}`, {
          headers : {
              'Access-Control-Allow-Origin' : '*',
          },
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          document.getElementById("attachments_form").reset();
          document.getElementById("file").value = [];
          this.setState({ selected_files : []})
          this.setState({ selected_files_num : 0})
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }

  render() {
    return(
      <div className="container-fluid">
        {/* <div className="row">
          <h1 className="pl-4 pb-4 pt-2">Tasker In Box</h1>
        </div>
        <div className="row">
          <div className="col-sm-1"/>
          <div className="col-sm"> */}
          
          <h1 className="pl-4 pb-4 pt-2">Tasker In Box</h1>

            <TaskerList
              taskers={this.state.taskers}
              attachments={this.state.attachments}
              selectedRow={this.state.selectedRow}
              apiURL={this.apiURL}
              selected_files={this.state.selected_files}
              onInputFileChange={this.handleFileInputChange}
              onRowClick={this.handleTaskerClick}
              onSubmitResponse={this.handleResponseSubmit}
              defaultValueResponse={this.state.selectedTasker.response}
            />
          {/* </div>
          <div className="col-sm-1"/>
        </div> */}
      </div>
    );
  }
}

export default TaskerInboxMain;