import React from "react"

import TaskerForm from "./TaskerForm"

class TaskerCreationMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],  //api querry should only return array of names
            tasker: {
                tasker_id : null,
                current_status : 'in progress',  //in progress, completed
                routing_at_unit_id: null,
                originator_unit_id : 1,
                sendToUnits: [],
                sendToUnits_ids: [],
                version_num : 0,
                updated_on : null,
                tasker_name : null,
                suspense_date : null,
                priority_lvl : 'low',
                predicted_workload : null,
                desc_text : null,
            },
            loged_in_unit: null,
        }
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    componentDidMount() {
        let date = this.formatDate(new Date(), 'YYYY-MM-DD');
        // console.log(date)
        let tempTasker = this.state.tasker;
        tempTasker.updated_on = date;
        this.setState({ tasker : tempTasker })

        // console.log(current_date)
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
        let tempSendToUnits = [];
        let tempSendToUnits_ids = [];
        let tempTasker = this.state.tasker;
        for(let i = 0; i < values.length; i++) {
            if(values[i].unit !== "") {
                tempSendToUnits.push(values[i].unit)
            }
        }
        tempSendToUnits_ids = tempSendToUnits.map((unit) => this.state.units.indexOf(unit) + 1)
        tempTasker.sendToUnits_ids = tempSendToUnits_ids;
        tempTasker.sendToUnits = tempSendToUnits;
        // console.log(tempSendToUnits)
        this.setState({ tasker : tempTasker })
    }


    handleSubmitTasker = async (e) => {
        e.preventDefault();     //may want to change this later
        console.log(this.state.tasker);
        //check to see that all required fields are filled out, send error if not

        //send a post to the taskers table with originator unit
        fetch(`http://localhost:3001/taskers`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.tasker),
        })
            .then((res) => res.json())
                //res is now the id assigned to the tasker in the taskers table, now post to the tasker_version table
                .then((res) => {
                    let newTasker = this.state.tasker;
                    newTasker.tasker_id = res;
                    // console.log(newTasker)
                    this.setState({ tasker : newTasker });

                    fetch(`http://localhost:3001/tasker_version`, {
                        method: 'POST',
                        headers : {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newTasker),
                    });

                    fetch(`http://localhost:3001/units_assigned_taskers`, {
                        method: 'POST',
                        headers : {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newTasker),
                    }).then((res) => res.json()).then((res) => console.log(res))
                        // .then((res) => {console.log(res)})

                })
                //now send post to units_assigned_taskers table


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