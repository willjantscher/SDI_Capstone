import React from "react"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
            unit_names: [],
            selected_unit: '',
            editPasswordView: false,
            editUnitView: false,
        }
    }

    componentDidMount = () => {
        let user_id = cookies.get("user_id");
        fetch(`http://localhost:3001/login/user/${user_id}`)
        .then(response => response.json())
        .then(user => 
            this.setState({
                unit_name: user.unit_name,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            })
        )
        fetch('http://localhost:3001/unit_names')
        .then(response => response.json())
        .then(resDetails => this.setState({unit_names: resDetails}))
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    changePassword = async () => {
        if (this.state.new_password !== this.state.confirm_new_password){
            alert("New passwords must match.")
            return
        }
        if (this.state.new_password === ''){
            alert("New password must not be empty.")
            return
        }
        const response = await fetch(`http://localhost:3001/login/change_password`, {
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
        } 
    }

    changeUnit = (event) => {
        event.preventDefault()
        const new_unit_id = this.state.unit_names.indexOf(this.state.selected_unit) + 1
        fetch(`http://localhost:3001/login/change_user_unit`, {
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

    render() {
        return(
            <div> 
                <h1>Welcome {this.state.first_name} {this.state.last_name}!</h1>
                <label>Name: {this.state.first_name} {this.state.last_name} </label>
                <br/>
                <label>Username: {this.state.username} </label>
                <br/>
                <label>Password: ***** </label>
                {
                this.state.editPasswordView ? 
                    <button onClick={this.editPasswordView}>Close</button>
                : <button onClick={this.editPasswordView}>Edit</button>
                }

                {
                this.state.editPasswordView ? 
                    <form onSubmit = {this.changePassword}>
                        <label>
                            Current Password:
                            <input type='password' name='old_password' value={this.state.old_password} onChange={this.handleInput}></input>
                        </label>
                        <br/>
                        <label>
                            New Password:
                            <input type='password' name='new_password' value={this.state.new_password} onChange={this.handleInput}></input>
                        </label>
                        <br/>
                        <label>
                            Confirm New Password:
                            <input type='password' name='confirm_new_password' value={this.state.confirm_new_password} onChange={this.handleInput}></input>
                        </label>
                        <br/>
                        <input type="submit" value="Save Changes" />
                    </form>
                : null
                }
                <br/>
                <label>Unit: {this.state.unit_name} </label>

                {
                this.state.editUnitView ? 
                    <button onClick={this.editUnitView}>Close</button>
                : <button onClick={this.editUnitView}>Edit</button>
                }

                {
                this.state.editUnitView ? 
                    <form onSubmit = {this.changeUnit}>
                        <label>New Unit:
                            <select name='selected_unit' value={this.state.selected_unit} onChange={this.handleInput}>
                                <option key="empty" value=""></option>
                                {this.state.unit_names.map(unit => <option value={unit} key={unit}> {unit}</option>)}
                            </select>
                        </label>
                        <br/>
                        <input type="submit" value="Save Changes" />
                    </form>
                : null
                }

            </div>
        )
    }

}


export default UserProfileMain;