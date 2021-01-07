import React from "react"


class TaskerOutboxMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            cookie:'',
            taskerResponses:[],
            currentTaskers:[]
        }
    }
    async handleViewTaskers(){
        let cookie = parseInt(document.cookie.substr(8))//this is the unit ID
        const result = await fetch(`http://localhost:3001/mytaskers/${cookie}`)
        const json = await result.json();
        this.setState({currentTaskers: json.concat()}) 
       }

   async handleViewResponses(){
        let cookie = parseInt(document.cookie.substr(8))//this is the unit ID
        const result = await fetch(`http://localhost:3001/myresponses/${cookie}`)
        const json = await result.json();
        this.setState({taskerResponses: json.concat()})  
       }

       handleResponseHideButton(){
           this.setState({taskerResponses: []})
       }

       handleTaskersHideButton(){
        this.setState({currentTaskers: []})
    }
    
    render() {
        const {currentTaskers, taskerResponses} = this.state
        return(
            <div>  
                <label id="1"> Tasker Responses</label> <br></br>
                <button type="submit" onClick={this.handleViewResponses.bind(this)} id="1"> View</button>
                {taskerResponses.length > 0 ? <button type="submit" onClick={this.handleResponseHideButton.bind(this)}> Hide</button> 
                : " "}
                {taskerResponses.map(res => <div>{"Tasker ID: "+res.tasker_id+ " --- Assigned Unit ID: "+ res.unit_id+ "--- Status: "+res.current_status+ " --- Response: "+res.response}</div>)}<br></br><br></br>

                <label id="2"> My Created Taskers</label> <br></br>
                <button type="submit" onClick={this.handleViewTaskers.bind(this)} id="2"> View</button>
                {currentTaskers.length > 0 ? <button type="submit" onClick={this.handleTaskersHideButton.bind(this)}> Hide</button> 
                : " "}
                
                <table>
                {currentTaskers.length > 0 ?
                    <thead>
                        <tr>
                            <td>| Tasker ID |</td>
                            <td>Assigned Unit ID |</td>
                            <td>Routing at Unit ID |</td>
                            <td>Response |</td>
                            <td>Current Status |</td>
                            <td>Actual Workload |</td>
                            <td>Originator Unit ID |</td>
                        </tr>
                    </thead>
                    : ""} 
                    
                    <tbody>
                        {currentTaskers.map(res => 
                        <tr>{Object.values(res).map(r => 
                            <td>{r}</td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>     
        )
    }
}
export default TaskerOutboxMain;