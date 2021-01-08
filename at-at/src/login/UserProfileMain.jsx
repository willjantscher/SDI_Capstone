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
        fetch(`http://localhost:3001/user/${user_id}`)
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

    changePassword = (event) => {
        if (this.state.new_password != this.state.confirm_new_password){
            alert("Passwords must match.")
            return
        }
        if (this.state.new_password == ''){
            alert("Password must not be empty.")
            return
        }
        fetch(`http://localhost:3001/change_password`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                passphrase: this.state.new_password,
              }),
           })
        .then(() => this.setState({new_password: '', confirm_new_password: ''}))
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const new_unit_id = this.state.unit_names.indexOf(this.state.selected_unit) + 1
        fetch(`http://localhost:3001/change_user_unit`, {
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
           cookies.set('unit_id', new_unit_id, { path: '/' })
            this.setState({
                unit_name: resDetails.unit_name, 
                selected_unit: ''
            })
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
                    <label>
                        <br/>
                        New Password:
                        <input type='password' name='new_password' value={this.state.new_password} onChange={this.handleInput}></input>
                        <br/>
                        Confirm New Password:
                        <input type='password' name='confirm_new_password' value={this.state.confirm_new_password} onChange={this.handleInput}></input>
                        <br/>
                        <button onClick={this.changePassword}>Save Changes</button>
                    </label>
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
                    <form onSubmit = {this.handleSubmit}>
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