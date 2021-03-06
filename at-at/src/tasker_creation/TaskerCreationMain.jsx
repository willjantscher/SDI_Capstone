/*
Personal access token for gitlab
user: will_jantscher
password: ppHvifzzxzYWCGgVcqAR
sdi06.staging.dso.mil/sdi06-api/        route to api

username: bigCheese
password: password

1. pull attachments for specific tasker in tasker inbox
2. display attachments as an href
3. have the href download the proper attachment on click
    - front end, fetch to href link correct (attachment id)
    - back end, /download/:attachment_id
4. add front end for attachments in tasker inbox
5. add back end for attachments in tasker inbox (reply)
6. add attachments in the tasker out box (both for taskers and taskers_assigned)
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
            route : "http://localhost:3001",
            // route for P1: https://sdi06.staging.dso.mil/sdi06-api
            units: [{}],  //api querry should only return array of names
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
            selected_files: null,
            selected_files_num: null,
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
        //get all the navbar tabs, deselect all, then select tasker inbox tab
        let tabs = Array.from(document.querySelectorAll('rux-tab'))
        tabs.forEach((tab) => tab.selected = false)
        tabs[2].selected = true
        
        this._isMounted = true;
        let user_id = cookies.get("user_id");  //cookie name is user_id
        let unit_id = cookies.get("unit_id");  //cookie name is unit_id
        let date = this.formatDate(new Date(), 'YYYY-MM-DD');
        let tempTasker = this.state.tasker;

        tempTasker.originator_unit_id = unit_id;
        tempTasker.user_id = user_id;
        tempTasker.updated_on = date;
        // console.log(tempTaskerEmpty)

        if(this._isMounted === true) {
            this.setState({ tasker : tempTasker});
        }

        // console.log(current_date)
        fetch(`${this.state.route}/units_info`, {
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
                        // console.log(res)
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

    handleFileInputChange = (e) => {
        // console.log(e.target.files)
        // console.log(e.target.files.length)
        this.setState({ selected_files_num : e.target.files.length })
        this.setState({ selected_files : e.target.files })
    }

    handleClickUploadFiles = (e) => {
        e.preventDefault();
        // console.log(this.state.selected_file)
        const formData = new FormData() 
        formData.append('file', this.state.selected_file)
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        
         fetch(`${this.state.route}/upload`, {
            headers : {
                'Access-Control-Allow-Origin' : '*',
            },
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
                .then(data => {
                console.log(data)
                })
                .catch(error => {
                    console.log(error);
                });
    }

    uploadFiles = (tasker_id) => {
        // console.log(this.state.selected_files)
        if(this.state.selected_files !== null) {
            for(var i = 0; i < this.state.selected_files.length; i++) {
                const formData = new FormData() 
                formData.append('file', this.state.selected_files[i])
                // for (var key of formData.entries()) {
                //     console.log(key[0] + ', ' + key[1]);
                // }
                
                fetch(`${this.state.route}/upload/${tasker_id}`, {
                    headers : {
                        'Access-Control-Allow-Origin' : '*',
                    },
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                        .then(data => {
                        console.log(data)
                        document.getElementById("tasker_form").reset();
                        document.getElementById("file").value = null;
                        this.setState({ selected_files : null})
                        this.setState({ selected_files_num : null})
                        })
                        .catch(error => {
                            console.log(error);
                        });
            }
        }
    }

    handleUnitChange = (values) => {
        // console.log(values)
        let tempSendToUnits = [];
        let tempSendToUnits_ids = [];
        let tempTasker = this.state.tasker;
        for(let i = 0; i < values.length; i++) {
            if(values[i].unit !== "") {
                tempSendToUnits.push(values[i].unit)
            }
        }
        // console.log(this.state.units)
        // console.log("this is the unit: " + this.state.units[(this.state.units.findIndex(unit => unit.unit_name === tempSendToUnits[0]))].id)
        tempSendToUnits_ids = tempSendToUnits.map((unit) => {
            // console.log("the units" + this.state.units)
            // console.log("the send to units" + tempSendToUnits)
            let indexOf = tempSendToUnits.indexOf(unit);
            return(
                this.state.units[(this.state.units.findIndex(unit => unit.unit_name === tempSendToUnits[indexOf]))].id
            )
        })
        // console.log(tempSendToUnits_ids)
        
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
            fetch(`${this.state.route}/taskers`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.tasker),
            })
                .then((res) => res.json())
                    //res is now the id assigned to the tasker in the taskers table, now post to the tasker_version table
                    .then((res) => {

                        //send fetches to db with file/files to save
                        this.uploadFiles(res);

                        let newTasker = this.state.tasker;
                        newTasker.tasker_id = res;

                        this.setState({ tasker : newTasker });

                        fetch(`${this.state.route}/tasker_version`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newTasker),
                        });

                        fetch(`${this.state.route}/units_assigned_taskers`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newTasker),
                        }).then((res) => res.json()).then((res) => console.log(res))
                            // .then((res) => {console.log(res)})

                        fetch(`${this.state.route}/notifications`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newTasker),
                        }).then(() => {
                            document.getElementById("tasker_form").reset();
                            let empty_tasker = {
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
                            }
                            empty_tasker.originator_unit_id = this.state.tasker.unit_id;
                            empty_tasker.user_id = this.state.tasker.user_id;
                            empty_tasker.updated_on = this.state.tasker.updated_on;
                            empty_tasker.originator_unit_id = this.state.tasker.originator_unit_id
                            this.setState({ tasker : empty_tasker })
                        })
                    })
        } 
    }

    taskerRenderer = () => {
        return(
            <div >
                <h1 className="pl-5 pb-4 pt-2">Create a Tasker</h1>
                {/* {console.log(this.state.units)} */}
                <TaskerForm 
                    onInputChange = {this.handleInputChange}
                    onUnitChange = {this.handleUnitChange}
                    onSubmitTasker = {this.handleSubmitTasker}
                    onFileInputChange = {this.handleFileInputChange}      
                    // onClickUploadFiles = {this.handleClickUploadFiles}              
                    units = {this.state.units}
                    flag = {this.state.submit_flag}
                    selected_files = {this.state.selected_files}
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

                {/* <a href="http://localhost:3001/download/1" download>download first file</a>     */}

            </div>
        )
    }

}


export default TaskerCreationMain;
