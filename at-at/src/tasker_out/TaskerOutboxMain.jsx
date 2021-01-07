import React from "react";
import { Router } from "react-router-dom";
import Cookies from "universal-cookie";
import EditTasker from './EditTasker';


class TaskerOutboxMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            taskerResponses:[],
            currentTaskers:[],
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
       }

//        handleDeleteTasker(){
        
//      }

   async handleEditTasker(){
    let tid = this.state.currentTaskers.map((res) => res.tasker_id)
    console.log(tid)
    // const response = await fetch(`http://localhost:3001/editmytasker/${tid}`,{
    //     method: 'PUT',
    //     mode: 'cors',
    //     headers: {'Content-Type': 'application/json; charset=UTF-8'},
    //     body: JSON.stringify(taskerResponse)
    //     });
       
    //     const json = await result.json();
    //     this.setState({currentTaskers: json.concat()})    
    //     this.setState({taskerResponses: []})
       }
    
    render() {
        const {currentTaskers, taskerResponses} = this.state
        return(
            <div> 
                <label id="1"> Received Responses</label> <br></br>
                <button type="submit" onClick={this.handleViewResponses.bind(this)} id="1"> View</button>
                {taskerResponses.length > 0 ? <button type="submit" onClick={this.handleResponseHideButton.bind(this)}> Hide</button> 
                : " "}
                {taskerResponses.map(res => <div style={{fontWeight: "bold"}}>{"Tasker ID: "+res.tasker_id+ " ----- Assigned Unit ID: "+ res.unit_id+ "----- Status: "+res.current_status+ " ----- Response: "+res.response}</div>)}<br></br><br></br>

                <label id="2"> My Created Taskers</label> <br></br>
                <button type="submit" onClick={this.handleViewTaskers.bind(this)} id="2"> View</button>
                {currentTaskers.length > 0 ? <button type="submit" onClick={this.handleTaskersHideButton.bind(this)}> Hide</button> 
                : " "}
                
                <table>
                {currentTaskers.length > 0 ?
                    <thead>
                        <tr>
                            <td>Version ID ----- </td>
                            <td>Tasker ID -----</td>
                            <td>Version # -----</td>
                            <td>Updated On -----</td>
                            <td>Tasker Name -----</td>
                            <td>Suspense Date -----</td>
                            <td>Priority Level -----</td>
                            <td>Predicted Workload -----</td>
                            <td>Description -----</td>
                            <td>My Unit ID</td>
                        </tr>
                    </thead>
                    : ""} 
                    
                    <tbody>
                        {currentTaskers.map(res => 
                        <tr>
                            {Object.values(res).map(r => 
                            <td>
                                {r}
                            </td>)}<EditTasker taskers={this.state.currentTaskers} editTasker={this.handleEditTasker.bind(this)}/>
                        </tr> )}
                    </tbody>
                </table>
            </div>     
        )
    }
}
export default TaskerOutboxMain;

{// <button type="submit" onClick={this.handleDeleteTasker.bind(this)}>Delete</button>
                            //<button type="submit" onClick={this.handleEditTasker.bind(this)}>Edit</button>
                        }