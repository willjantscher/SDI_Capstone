/*
to do:
    update the originator_unit_id based on the unit logged in (cookie)

    2. add conditional rendering for the form/success message

    better select for units
        https://react-select.com/home

    1. add alerts for input fields blank when they can't be null
        create a switch based on the submit_flag!
        set to null when clicking a button to submit another 


    beautification with https://www.astrouxds.com/
    additional features:
        add attachments'
        change unit selectoer
            have sub selects under their parents
            https://github.com/insin/react-filtered-multiselect

import Cookies from 'universal-cookie';
let cookies = new Cookies();
let user_id = cookies.get("user_id");  //cookie name is user_id
let unit_id = cookies.get("unit_id");  //cookie name is unit_id

also for testing:
username: bigCheese
password: password

docker-compose up --build
*/






import React from "react"
import Cookies from 'universal-cookie';

import TaskerForm from "./TaskerForm"
import SubmitTaskerChecker from "./SubmitTaskerChecker"

let cookies = new Cookies();


class TaskerCreationMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],  //api querry should only return array of names
            tasker: {
                tasker_id : null,
                current_status : 'in progress',  //in progress, completed
                routing_at_unit_id: null,
                user_id : null,
                originator_unit_id : null,
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
        let user_id = cookies.get("user_id");  //cookie name is user_id
        let unit_id = cookies.get("unit_id");  //cookie name is unit_id
        let date = this.formatDate(new Date(), 'YYYY-MM-DD');
        let tempTasker = this.state.tasker;

        tempTasker.originator_unit_id = unit_id;
        tempTasker.unit_id = unit_id;
        tempTasker.updated_on = date;
        this.setState({ tasker : tempTasker});

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
        // console.log(this.state.tasker)
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

    taskerRenderer = () => {
        return(
            <div>
                <h1>Create a Tasker</h1>

                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onUnitChange = {this.handleUnitChange}
                    onSubmitTasker = {this.handleSubmitTasker}                    
                    units = {this.state.units}
                />

                {(() => {
                    switch (this.state.submit_flag) {
                        case "bad_sendToUnits":
                            return (
                                <div className="alert-danger text-center">
                                    You must select a unit!
                                </div>
                            );
                        case "bad_tasker_name":
                            return (
                                <div className="alert-danger text-center">
                                    You must input a tasker name!
                                </div>
                            );
                        case "bad_suspense_date":
                            return (
                                <div className="alert-danger text-center">
                                    You must select a valid suspense date!
                                </div>
                            );
                        case "bad_predicted_workload":
                            return (
                                <div className="alert-danger text-center">
                                    You must input a predicted workload!
                                </div>
                            );
                        case "bad_desc_text":
                            return (
                                <div className="alert-danger text-center">
                                    You must input a tasker description!
                                </div>
                            );
                        case "good":
                            return (
                                <div className="alert-danger text-center">
                                    Tasker sent successfuly!
                                </div>
                            );
                        default:
                            return <div></div>;
                    }
                })()}
            </div>
        )
    }
 

    render() {
        //if doing initial api query async, add a switch that will render a loading icon until fetch is complete?
        return(
            
            <div>

                {(() => {
                    switch (this.state.tasker.originator_unit_id) {
                        case undefined:
                            return (
                                <div className="alert-danger text-center">
                                    You do not have access to this page!
                                </div>
                            );
                    
                        default:
                            return (
                                <div>
                                    welcome!
                                    <this.taskerRenderer />
                                </div>
                            )
                    }
                })()}


                

            </div>
        )
    }

}


export default TaskerCreationMain;