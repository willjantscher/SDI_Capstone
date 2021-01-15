import React from "react";
import { Route, Router } from "react-router-dom";
import Cookies from "universal-cookie";
import EditTasker from './EditTasker';
import TaskerAttachmentInput from '../tasker_in/TaskerAttachmentInput'
import ViewResponses from './ViewResponses';
import icon from '../icons/attachment_icon.png';
import { DateTime } from 'luxon';

class TaskerOutboxMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            taskerResponses:[],
            responseAttachments: [],
            currentTaskers:[],
            taskerAttachments:[],
            descText: '',
            index:'',
            v:'',
            delVis:'',
            values : {
                tid: '',
                vnum: '',
                update: '',
                tasker_name: '',
                suspense: '',
                priority: '',
                workload: '',
                desc: '',
            },
            selectedTasker: {},
            selectedResponse: {},
        }
    }
    async handleViewTaskers(){
        let cookies = new Cookies()
        let unit_id = cookies.get("unit_id")
        let user_id = cookies.get("user_id")
        const result = await fetch(`http://localhost:3001/mytaskers/${unit_id}`)
        const json = await result.json();
        this.setState({currentTaskers: json.concat()}) 
        
       }

   async handleViewResponses(){
        let cookies = new Cookies()
        let unit_id = cookies.get("unit_id")
        let user_id = cookies.get("user_id")
        const result = await fetch(`http://localhost:3001/myresponses/${unit_id}`)
        const json = await result.json();
        this.setState({taskerResponses: json.concat()})
        }

       handleResponseHideButton(){
           this.setState({taskerResponses: []})
       }

       handleTaskersHideButton(){
        this.setState({currentTaskers: []})
        this.setState({v: false, delVis: false})
       }

        handleVisibility(e){ 
            this.setState({v : true, index : e.target.value})
            
      }

      deleteTask(e){
        this.setState({delVis : true, index : e.target.value})
    }

        handleEditTasker(e){

        this.state.values[e.target.name] = e.target.value;
        this.setState({ values : this.state.values })

    }

async handleUpdate(e){
    
    let v = this.state.values;

    

    if(v){e.preventDefault();
        if(parseInt(v.tid) !== this.state.currentTaskers[this.state.index].tasker_id){
            return alert("Please click on the 'Tasker ID' text box to ensure you are updating the correct tasker")}
        else if(v.vnum === '' ){
            return alert("Enter a value for 'Version number'")}  
        else if(v.update === ''){
            return alert("Enter a value for 'Date Updated'")}
        else if(v.tasker_name === ''){
            return alert("Enter a value for 'Tasker Name'")}
        else if(v.suspense === '' ){
            return alert("Enter a valid for 'Suspense Date'")}
        else if(v.priority === ''){
            return alert("Enter a value for 'Priority Level'")}
        else if(v.workload === ''){
            return alert("Enter a value for 'Estimated Workload'")}
        else if(v.desc === ''){
            return alert("Enter a value for 'Tasker Description'")}
        }
    
        alert('Updated Successfully!')
        window.location.reload();

    let s = this.state.values
    console.log(JSON.stringify({tasker_id : [s.tid]}))
    const response = await fetch('http://localhost:3001/editmytasker'
    ,{
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            tasker_id: s.tid,
            version_num: s.vnum,
            updated_on: s.update,
            tasker_name: s.tasker_name,
            suspense_date: s.suspense,
            priority_lvl:s.priority,
            predicted_workload: s.workload,
            desc_text: s.desc
          }),
        });
    }


async handleDelete(){

    let tid = this.state.currentTaskers[this.state.index].tasker_id
    let vnum = this.state.currentTaskers[this.state.index].version_num
    alert('Delete Success')
    window.location.reload();
    const response = await fetch(`http://localhost:3001/deleteTasker/${tid}/${vnum}`
        ,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })

        alert('Delete Success')
        window.location.reload();
        }

    componentDidMount(){
        //get all the navbar tabs, deselect all, then select tasker inbox tab
        let tabs = Array.from(document.querySelectorAll('rux-tab'))
        tabs.forEach((tab) => tab.selected = false)
        tabs[4].selected = true
        this.handleViewTaskers();
        //this.fetchAttachments();
    
    }

    fetchAttachments = async(taskerId, isResponse) => {
        let apiURL = `http://localhost:3001/attachments/${taskerId}`;
        if (isResponse) {
            apiURL = `http://localhost:3001/units_assigned_taskers/attachments`;
        }
        const response = await fetch(`${apiURL}`, {method: 'GET'});
        const attachments = await response.json();
        return attachments;
    }

    handleTaskerRowClick = async(e) => {
        const rowIndex = e.currentTarget.id;
        const tasker = this.state.currentTaskers[rowIndex];
        const attachments = await this.fetchAttachments(tasker.tasker_id, false);
        this.setState({selectedTasker: tasker, taskerAttachments: attachments});
    }

    handleResponseRowClick = async(e) => {
        const rowIndex = e.currentTarget.id;
        const response = this.state.taskerResponses[rowIndex];
        const allAttachments = await this.fetchAttachments(response.tasker_id, true);
        const attachments = allAttachments.filter(attachment => attachment.units_assigned_taskers_id === response.id);
        this.setState({selectedResponse: response, responseAttachments: attachments});
    }


    getAttachmentNames = (attachments) => {
        return (
        <div className="col-md-4">
            {attachments.map(attachment => {
            return(
                <p key={attachment.id} className="">
                <img src={icon} alt="listItemIcon" height="20" width="20"/>
                <a href={`http://localhost:3001/download/reply/${attachment.id}`}>
                    {attachment.originalname}
                </a>
                
                </p>
            );
            })}
        </div>
        );
    }

    render() {
        const {currentTaskers} = this.state
        return(
            <div className="container-fluid"> 
                <ViewResponses 
                    hide={this.handleResponseHideButton.bind(this)} 
                    responses={this.state.taskerResponses} 
                    viewResponses={this.handleViewResponses.bind(this)}
                    onRowClick={this.handleResponseRowClick}
                    getAttachmentNames={this.getAttachmentNames}
                    responseAttachments={this.state.responseAttachments}
                    selectedResponse={this.state.selectedResponse}/><br></br>
                <div className="container-fluid">
                    <label><h1>My Created Taskers</h1> </label>
                        <button  style={{float: 'left'}} className ="rux-button" type="submit" onClick={this.handleViewTaskers.bind(this)}>View</button> 
                         {currentTaskers.length > 0 ? 
                        <button className ="rux-button" type="submit" onClick={this.handleTaskersHideButton.bind(this)}> Hide</button> : ""}
               </div><br></br><br></br>

                <div className="container-fluid">        
                <table className= "rux-table">
                {currentTaskers.length > 0 ?
                    <thead>
                        <tr>
                            <th><h3>Tasker ID</h3></th>
                            <th><h3>Version</h3></th>
                            <th><h3>Updated On </h3></th>
                            <th><h3>Tasker Name</h3></th>
                            <th><h3>Suspense</h3></th>
                            <th><h3>Priority</h3></th>
                            <th><h3>Est. Workload</h3></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    :""} 

                    <tbody>
                        {currentTaskers.map((res, i) => 
                        <tr className="will-colors" id={i} onClick={this.handleTaskerRowClick}>
                            {Object.values(res).filter((val, index) => index !== 7).map((r, index) => 
                            <td>
                                {index === 2 || index === 4
                                ? DateTime.fromISO(r, {zone: 'utc'}).toLocaleString()
                                : r}
                            </td>)}
                            {/* <td> 
                                <button className="rux-button" onClick={this.fetchAttachments} value={i}>View</button>
                                {this.state.attachments.filter(attachment => {
                                    return res.tasker_id === attachment.tasker_id;
                                }).map((res) => Object.values(res)[1])}
                            </td> */}

                            <td>{currentTaskers.length > 0 ?<button className="rux-button" type="submit" value={i} onClick={this.handleVisibility.bind(this)}>Edit</button>:""}</td>
                            <td>{currentTaskers.length > 0 ?<button className="rux-button"type="submit" value={i} onClick={this.deleteTask.bind(this)}>Delete</button>:""}</td>  
                            
                            
                        </tr>)}
                    </tbody>
                </table><br></br>
                
                <table className="rux-table">
                    <tbody>
                        <tr>
                            <td>
                                <p
                                    className="mt-3 ml-2"
                                    id="taskerDetails"
                                    style={{width: "100%", wordBreak: "break-word", whiteSpace: "normal"}}
                                ><h3>Tasker Details: </h3>{" "}
                                    {this.state.selectedTasker.desc_text}
                                </p>
                            </td>
                        </tr>
                        {this.state.taskerAttachments.length > 0
                        ? <tr>
                            <td>
                                <ul>
                                    {this.getAttachmentNames(this.state.taskerAttachments)}
                                </ul>
                            </td>
                        </tr>
                        : ""}
                        
                    </tbody>
                </table>
                </div> <br></br>

                <EditTasker v ={this.state.v} 
                            taskers= {this.state.currentTaskers}
                            handleEdit ={this.handleEditTasker.bind(this)}
                            val={this.state.values} 
                            delVis={this.state.delVis}
                            delete={this.handleDelete.bind(this)}
                            index={this.state.index}
                            hide={this.handleTaskersHideButton.bind(this)}
                            update={this.handleUpdate.bind(this)}/>

                <p></p>
            </div>     
        )
    }
}
export default TaskerOutboxMain;