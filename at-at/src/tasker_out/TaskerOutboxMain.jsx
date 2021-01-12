import React from "react";
import { Route, Router } from "react-router-dom";
import Cookies from "universal-cookie";
import EditTasker from './EditTasker';


class TaskerOutboxMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            taskerResponses:[],
            currentTaskers:[],
            v:'',
            values : {
                tid: '',
                vnum: '',
                update: '',
                tasker_name: '',
                suspense: '',
                priority: '',
                workload: '',
                desc: '',
            }
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
        this.setState({v: false})
       }

        handleVisibility(){
            this.setState({v : true})
            
      }

     handleEditTasker(e){

        this.state.values[e.target.name] = e.target.value;
        this.setState({ values : this.state.values })
       
    }

async handleUpdate(e){
    
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
        e.preventDefault();
    alert("Successfully Updated")
  }
    
    render() {
        const {currentTaskers, taskerResponses} = this.state
        return(
            <div> 
                <label id="1"> Received Responses</label> <br></br>
                <button type="submit" onClick={this.handleViewResponses.bind(this)} id="1"> View</button>
                {taskerResponses.length > 0 ? <button type="submit" onClick={this.handleResponseHideButton.bind(this)}> Hide</button> 
                : " "}
                {taskerResponses.map(res => <div>{"Tasker ID: "+res.tasker_id+ " ----- Assigned Unit ID: "+ res.unit_id+ "----- Status: "+res.current_status+ " ----- Response: "+res.response}</div>)}<br></br><br></br>

                <label id="2"> My Created Taskers</label> <br></br>
                <button type="submit" onClick={this.handleViewTaskers.bind(this)} id="2"> View</button>
                {currentTaskers.length > 0 ? <button type="submit" onClick={this.handleTaskersHideButton.bind(this)}> Hide</button> 
                : " "}
                {currentTaskers.length > 0 ? <button type="submit" onClick={this.handleVisibility.bind(this)}>Edit Tasker</button>
                : " "}
      
                <table>
                {currentTaskers.length > 0 ?
                    <thead>
                        <tr>
                            <td>Tasker ID</td>
                            <td>Version # </td>
                            <td>Updated On </td>
                            <td>Tasker Name </td>
                            <td>Suspense Date </td>
                            <td>Priority Level </td>
                            <td>Predicted Workload </td>
                            <td>Description </td>
                        </tr>
                    </thead>
                    : ""} 
                    
                    <tbody>
                        {currentTaskers.map((res, i) => <tr>
                            {Object.values(res).map(r => 
                            <td>
                                {r}
                            </td>)}
                        </tr> )}
                    </tbody>
                </table><br></br>
                <EditTasker v ={this.state.v} 
                            handleEdit ={this.handleEditTasker.bind(this)} 
                            val={this.state.values} 
                            state={this.state}
                            update={this.handleUpdate.bind(this)}/>
            </div>     
        )
    }
}
export default TaskerOutboxMain;