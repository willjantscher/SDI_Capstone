import React from "react"

import TaskerForm from "./TaskerForm"
import FormExample from "./FormExample"

class TaskerCreationMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],  //api querry should only return array of names
            sendToUnits: [],
            tasker: {
                originator_unit_id : 1,
                tasker_name : null,
                suspense_date : null,
                priority : null,
                predicted_workload : null,
                description : null,
            },
            loged_in_unit: null,
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3001/unit_names`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => res.json())
                .then((res) => {
                    // console.log(res);
                    this.setState({ units : res })
                })
    }

    handleInputChange = (e) => {
        let tempTasker = this.state.tasker;
        tempTasker[e.target.id] = e.target.value;
        this.setState({ tasker : tempTasker })
    }

    handleUnitChange = (values) => {
        let tempSendToUnits = []
        for(let i = 0; i < values.length; i++) {
            if(values[i].unit !== "") {
                tempSendToUnits.push(values[i].unit)
            }
        }
        // console.log(tempSendToUnits)
        this.setState({ sendToUnits : tempSendToUnits })
    }


    handleSubmitTasker = (e) => {
        e.preventDefault();     //may want to change this later
        console.log(this.state.tasker);

        //send a post to taskers table with originator unit
        fetch(`http://localhost:3001/taskers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.tasker)
        })
            .then((res) => res.json())
                .then((res) => {console.log(res)})
        //send post to tasker version with all info, version 0 

        //send post to units_assigned_taskers table for each unit assigned

    }

    render() {
        //if doing initial api query async, add a switch that will render a loading icon until fetch is complete?
        return(
            <div>
                <h1>Create a Tasker</h1>
                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onUnitChange = {this.handleUnitChange}
                    onSubmitTasker = {this.handleSubmitTasker}                    
                    units = {this.state.units}
                />
                {/* <FormExample/> */}
            </div>
        )
    }

}


export default TaskerCreationMain;