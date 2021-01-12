import React from "react";
import { Route, Router } from "react-router-dom";
import Cookies from "universal-cookie";
import EditTasker from './EditTasker';
import ViewResponses from './ViewResponses';


class TaskerOutboxMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            taskerResponses:[],
            currentTaskers:[],
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
        this.setState({v: false, delVis: false})
       }

        handleVisibility(e){ 
            this.setState({v : true, index : e.target.value})
      }

        handleEditTasker(e){

        this.state.values[e.target.name] = e.target.value;
        this.setState({ values : this.state.values })

    }

async handleUpdate(e){
    
    let v = this.state.values;

    console.log(new Date())

    if(v){e.preventDefault();
        if(parseInt(v.tid) !== this.state.currentTaskers[this.state.index].tasker_id){
            return alert("Please click on the 'Tasker ID' text box to ensure you are updating the correct tasker")}
        else if(v.vnum === '' ){
            return alert("Enter a value for 'Version number'")}  
        else if(v.update === ''){
            return alert("Enter a value for 'Date Updated'")}
        else if(v.tasker_name === ''){
            return alert("Enter a value for 'Tasker Name'")}
        else if(v.suspense === ''){
            return alert("Enter a value for 'Suspense Date'")}

        else if(v.suspense === '' || new Date(v.suspense) < new Date()){
            return alert("Please enter a valid suspense date")}

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



    deleteTask(e){
        this.setState({delVis : true, index : e.target.value})
        alert("Delete actions are final!")

    }

async handleDelete(){

    let tid = this.state.currentTaskers[this.state.index].tasker_id
    alert('Delete Success')
    window.location.reload();
    const response = await fetch(`http://localhost:3001/deleteTasker/${tid}`
        ,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })

        alert('Delete Success')
        window.location.reload();
        }

    
    render() {
        const {currentTaskers} = this.state
        return(
            <div> 
                <ViewResponses 
                    hide={this.handleResponseHideButton.bind(this)} 
                    responses={this.state.taskerResponses} 
                    viewResponses={this.handleViewResponses.bind(this)}/><br></br>

                    <label> My Created Taskers</label> <br></br>
                         <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={this.handleViewTaskers.bind(this)}>View</button>{currentTaskers.length > 0 ? <button className ="rux-button" type="submit" onClick={this.handleTaskersHideButton.bind(this)}> Hide</button> : ""}
              
                <table>
                {currentTaskers.length > 0 ?
                    <tbody>
                        <tr>
                            <td>Tasker ID</td>
                            <td>Version #</td>
                            <td>Updated On (YYYY/MM/DD)</td>
                            <td>Tasker Name</td>
                            <td>Suspense Date (YYYY/MM/DD)</td>
                            <td>Priority Level</td>
                            <td>Est. Workload (Hours)</td>
                            <td>Description</td>
                        </tr>
                    </tbody>
                    :""} 

                    <tbody>
                        {currentTaskers.map((res, i) => 
                        <tr>
                            {Object.values(res).map(r => 
                            <td>
                                {r}
                            </td>)}
                            <td>{currentTaskers.length > 0 ?<button className="rux-button" type="submit" value={i} onClick={this.handleVisibility.bind(this)}>Edit</button>:""}</td>
                            <td>{currentTaskers.length > 0 ?<button className="rux-button"type="submit" value={i} onClick={this.deleteTask.bind(this)}>Delete</button>:""}</td>
                        </tr>)}
                    </tbody>
                </table><br></br>
                <EditTasker v ={this.state.v} 
                            taskers= {this.state.currentTaskers}
                            handleEdit ={this.handleEditTasker.bind(this)}
                            val={this.state.values} 
                            delVis={this.state.delVis}
                            delete={this.handleDelete.bind(this)}
                            index={this.state.index}
                            hide={this.handleTaskersHideButton.bind(this)}
                            update={this.handleUpdate.bind(this)}/>
            </div>     
        )
    }
}
export default TaskerOutboxMain;