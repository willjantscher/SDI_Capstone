import React from "react"
import Cookies from 'universal-cookie';
import UnitsDropdown from "./UnitsDropdown"
import './userprofile.css'

const cookies = new Cookies();
const apiURL = 'http://localhost:3001';

class UserProfileMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
            unit_name: '',
            username: '',
            first_name: '',
            last_name: '',
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            selected_unit: '',
            editPasswordView: false,
            editUnitView: false,
            units: [{}],
        }
    }

    componentDidMount = () => {
        //get all the navbar tabs, deselect all, then select tasker inbox tab
        let tabs = Array.from(document.querySelectorAll('rux-tab'))
        tabs.forEach((tab) => tab.selected = false)
        tabs[5].selected = true

        let user_id = cookies.get("user_id");
        fetch(`${apiURL}/login/user/${user_id}`)
        .then(response => response.json())
        .then(user => 
            this.setState({
                unit_name: user.unit_name,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            })
        )

        fetch(`${apiURL}/units_info`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState({ units : res })
        })
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    changePassword = async (event) => {
        event.preventDefault()
        if (this.state.new_password !== this.state.confirm_new_password){
            alert("New passwords must match.")
            return
        }
        if (this.state.new_password === ''){
            alert("New password must not be empty.")
            return
        }
        const response = await fetch(`${apiURL}/login/change_password`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                old_password: this.state.old_password,
                passphrase: this.state.new_password,
              }),
           })
        if(response.status === 200){
            alert("Password change successful!")
            this.setState({
                new_password: '', 
                confirm_new_password: '', 
                old_password: '',
                editPasswordView: false,
            }, this.render)
        } else if (response.status === 401){
            alert("Current password is incorrect.")
            return
        } else {
            alert("Error")
        }
    }

    changeUnit = (event) => {
        event.preventDefault()
        if(!this.state.selected_unit){
            alert("Please select a unit.")
            return
        }

        const new_unit_id = this.state.units.filter(unit => 
            unit.unit_name === this.state.selected_unit)[0].unique_id

        fetch(`${apiURL}/login/change_user_unit`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                unit_id: new_unit_id,
                username: this.state.username
              }),
           })
        .then(response => response.json())
        .then(resDetails => 
           {
            alert("Unit change successful!")
            cookies.set('unit_id', new_unit_id, { path: '/' })
            this.setState({
                unit_name: resDetails.unit_name, 
                selected_unit: '',
                editUnitView: false
            }, this.render)
           }
        )
    }

    editPasswordView = () => {
        this.setState({editPasswordView: !this.state.editPasswordView}, this.render)
    }

    editUnitView = () => {
        this.setState({editUnitView: !this.state.editUnitView}, this.render)
    }

    unitView = () => {
        if(this.state.editUnitView){
            return(
                <>
                <div className="rux-form-field__label"></div>
                 <form className="container-fluid" onSubmit = {this.changeUnit}>
                    <UnitsDropdown                    
                        units = {this.state.units}
                        onUnitSelection = {this.handleInput} 
                        select_name = 'selected_unit'                   
                    />
                    <div className="row pb-3 pl-5 pt-2">
                        <div className="col-2"></div>
                        <div className="col-md-1">
                            <input className="will-colors rux-button" type="submit" value="Save Changes"/>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-1">
                            <input className="will-colors rux-button" type="button" onClick={this.editUnitView} value="Cancel"/>
                        </div>
                    </div>
                </form>
                </>
            )
        } else {
            return null
        }
    }

    passwordView = () => {
        if(this.state.editPasswordView){
        //if(true){
            return(
                <>
                <div className="rux-form-field__label"></div>
                <form className="container-fluid" onSubmit = {this.changePassword}>
                    <div className="row pb-3 pl-5 pt-3"> 
                        <label htmlFor="old_password" className="col-2 pt-2" >Current Password:</label>
                        <input
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className="rux-input col-3 will-colors"
                            id="old_password"
                            type="password"
                            name="old_password"
                            value={this.state.old_password}
                            onChange={this.handleInput}
                        ></input>
                    </div>
                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="new_password" className="col-2 pt-2" >New Password:</label>
                        <input
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className="rux-input col-3 will-colors"
                            id="new_password"
                            type="password"
                            name="new_password"
                            value={this.state.new_password}
                            onChange={this.handleInput}
                        ></input>
                    </div>
                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="confirm_new_password" className="col-2 pt-2" >Confirm New Password:</label>
                        <input
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className="rux-input col-3 will-colors"
                            id="confirm_new_password"
                            type="password"
                            name="confirm_new_password"
                            value={this.state.confirm_new_password}
                            onChange={this.handleInput}
                        ></input>
                    </div>
                    <div className="row pb-3 pl-5 pt-2">
                        <div className="col-2"></div>
                        <div className="col-md-1">
                            <input className="will-colors rux-button" type="submit" value="Save Changes"/>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-1">
                            <input className="will-colors rux-button" type="button" onClick={this.editPasswordView} value="Cancel"/>
                        </div>
                    </div>
                </form>
                </>
            )
        }else{
            return null
        }
    }

    render() {
        return(
            <div className="container-fluid user_profile_table"> 
                <h1 className="pl-3 pb-4 pt-3">Welcome {this.state.first_name} {this.state.last_name}!</h1>
                <hr></hr>
                <div className="row pl-5 pt-4"> 
                    <label htmlFor="name" className="col-2"><b>Name:</b></label>
                    <label htmlFor="name" className="col-2">{this.state.first_name} {this.state.last_name}</label>
                </div>
                <div className="row pl-5 pt-4"> 
                    <label htmlFor="username" className="col-2"><b>Username:</b></label>
                    <label htmlFor="username" className="col-2">{this.state.username}</label>
                </div>
                <div className="row pl-5 pt-4"> 
                    <label htmlFor="password" className="col-2"><b>Password:</b></label>
                    <label htmlFor="password" className="col-2">********</label>
                    <label htmlFor="password" className="col-2">
                        {this.state.editPasswordView 
                        ? null
                        :
                            <input 
                            className="will-colors rux-button" 
                            type="button" 
                            onClick={this.editPasswordView}
                            value="Edit"/>
                        }
                    </label>
                </div>
                {this.passwordView()}
                <div className="row pl-5 pt-3"> 
                    <label htmlFor="password" className="col-2"><b>Unit:</b></label>
                    <label htmlFor="password" className="col-2">{this.state.unit_name}</label>
                    <label htmlFor="password" className="col-2">
                        {this.state.editUnitView 
                        ? null
                        :
                            <input 
                            className="will-colors rux-button" 
                            type="button" 
                            onClick={this.editUnitView}
                            value="Edit"/>
                        }
                    </label>
                </div>
                {this.unitView()}
            </div>
        )
    }

}


export default UserProfileMain;