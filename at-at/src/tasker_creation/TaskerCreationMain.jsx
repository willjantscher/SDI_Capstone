/*
to do:
    update the originator_unit_id based on the unit logged in (cookie)

    add conditional rendering for the form/success message

    add alerts for input fields blank when they can't be null
        create a switch based on the submit_flag!
        set to null when clicking a button to submit another 


    beautification with https://www.astrouxds.com/
    additional features:
        add attachments'
        change unit selectoer
            have sub selects under their parents
            https://github.com/insin/react-filtered-multiselect


*/





import React from "react"

import TaskerForm from "./TaskerForm"
import SubmitTaskerChecker from "./SubmitTaskerChecker"

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
            submit_flag: null,
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
        e.preventDefault();
        let flag = SubmitTaskerChecker(this.state.tasker)
        this.setState({ submit_flag : flag })
        //checks to see if data is good for a submit
        if(flag === 'good'){
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

                        fetch(`http://localhost:3001/notifications`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newTasker),
                        })
                    })
        } else (
            //send a post to the taskers table with originator unit
            console.log(flag)
        )
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