/*
to do:
    better select for units
        https://react-select.com/home

    additional features:
        add attachments'
        change unit select
            have sub selects under their parents    refactor fetch to return id, parent id, and name
            https://github.com/insin/react-filtered-multiselect

username: bigCheese
password: password

docker-compose up --build

redirect if no valid cookie!! implement for all pages
*/


import React from "react"
import Cookies from 'universal-cookie';
import { Redirect, Route } from "react-router-dom";

import TaskerForm from "./TaskerForm"
import SubmitTaskerChecker from "./SubmitTaskerChecker"

let cookies = new Cookies();


class TaskerCreationMain extends React.Component {
    _isMounted = false;

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
                predicted_workload : 1,
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
        this._isMounted = true;
        let user_id = cookies.get("user_id");  //cookie name is user_id
        let unit_id = cookies.get("unit_id");  //cookie name is unit_id
        let date = this.formatDate(new Date(), 'YYYY-MM-DD');
        let tempTasker = this.state.tasker;

        tempTasker.originator_unit_id = unit_id;
        tempTasker.user_id = user_id;
        tempTasker.updated_on = date;
        if(this._isMounted === true) {
            this.setState({ tasker : tempTasker});
        }

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
                    if(this._isMounted === true) {
                        this.setState({ units : res })
                    }
                })
    }
    componentWillUnmount() {
        this._isMounted = false;
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
                        }).then(() => {
                            document.getElementById("tasker_form").reset();
                        })
                    })
        } 
    }

    taskerRenderer = () => {
        return(
            <div>
                <h1 className="pl-4 pb-4 pt-2">Create a Tasker</h1>

                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onUnitChange = {this.handleUnitChange}
                    onSubmitTasker = {this.handleSubmitTasker}                    
                    units = {this.state.units}
                />

            </div>
        )
    }
 
    componentDidUpdate() {
        if(this.state.submit_flag === "bad_sendToUnits") {
            alert("You must select a Unit!")
            this.setState({ submit_flag : null })
        } else if(this.state.submit_flag === "bad_tasker_name") {
            alert("You must specify a tasker name!")
            this.setState({ submit_flag : null })
        } else if(this.state.submit_flag === "bad_suspense_date") {
            alert("You must select a valid suspense date!")
            this.setState({ submit_flag : null })
        } else if (this.state.submit_flag === "bad_desc_text") {
            alert("You must input a tasker description!")
            this.setState({ submit_flag : null })
        } else if (this.state.submit_flag === "good") {
            alert("Tasker sent successfully!")
            this.setState({ submit_flag : null })
        }
       
    }

    render() {
        

        //if doing initial api query async, add a switch that will render a loading icon until fetch is complete?
        return(
            
            
            <div>

                {(() => {
                    switch (this.state.tasker.originator_unit_id) {
                        case undefined:
                            return(
                                <div>
                                    {console.log('No user logged in')}
                                    <Redirect to = "/" />
                                </div>
                            )

                            // return (
                            //     <div className="alert-danger text-center">
                            //         You do not have access to this page!
                            //     </div>
                            // );
                    
                        default:
                            return (
                                <div>
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