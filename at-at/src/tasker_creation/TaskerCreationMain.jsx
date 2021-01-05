import React from "react"

import TaskerForm from "./TaskerForm"

class TaskerCreationMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],  //api querry should only return array of names
        }
    }

    componentDidMount() {
        // do initial api queries here - get the values for the units to populate the pulldown in the taskerform
        this.setState({ units: ['Chief of Space Operations (CSO)', 'USSF Element - NRO', 'Space Operations Command (SpOC)'] })
    }

    handleInputChange = (e) => {

    }

    handleAddAnotherUnit = (e) => {
        return(
            <div>added unit</div>
        )
    }

    handleSubmitTasker = (e) => {
        e.preventDefault();     //may want to change this later
        // console.log("submit pressed");
    }

    render() {
        //if doing initial api query async, add a switch that will render a loading icon until fetch is complete?
        return(
            <div>
                <div> I am inside of the Tasker Creation Main page</div>
                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onSubmitTasker = {this.handleSubmitTasker}
                    onAddAnotherUnit = {this.handleAddAnotherUnit}
                    units = {this.state.units}
                />
            </div>
        )
    }

}


export default TaskerCreationMain;