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
                tasker_name : null,
                suspense_date : null,
                priority : null,
                predicted_workload : null,
                description : null,
            },
        }
    }

    componentDidMount() {
        // do initial api queries here - get the values for the units to populate the pulldown in the taskerform
        this.setState({ units: ['Chief of Space Operations (CSO)', 'USSF Element - NRO', 'Space Operations Command (SpOC)'] })
    
        fetch(`http://localhost:3001/unit_names`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => res.json())
                .then((res) => {
                    console.log(res);
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
        console.log(tempSendToUnits)
        this.setState({ sendToUnits : tempSendToUnits })
    }


    handleSubmitTasker = (e) => {
        e.preventDefault();     //may want to change this later
        console.log(this.state.sendToUnits, this.state.tasker);
    }

    render() {
        //if doing initial api query async, add a switch that will render a loading icon until fetch is complete?
        return(
            <div>
                <h1>Create a Tasker</h1>
                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onUnitChange = {this.handleUnitChange}
                    onSubmitTasker = {this.handleSubmitTasker}                    units = {this.state.units}
                />
                {/* <FormExample/> */}
            </div>
        )
    }

}


export default TaskerCreationMain;