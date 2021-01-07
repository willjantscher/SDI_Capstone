import React from "react"
import Cookies from 'universal-cookie';

class RegisterMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: '',
            confirmPassphrase: '',
            first_name: '',
            last_name: '',
            unit_names: [],
            selected_unit: ''
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/unit_names')
        .then(response => response.json())
        .then(resDetails => this.setState({unit_names: resDetails}))
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    handleRegistration = async (event) => {
        event.preventDefault()
        if(this.state.passphrase != this.state.confirmPassphrase){
            alert('Passwords must match')
            return
        }
        if(!this.state.selected_unit || !this.state.username || !this.state.passphrase || !this.state.first_name || !this.state.last_name){
            alert('Please fill in all fields')
            return
        }
        const response = await fetch(`http://localhost:3001/register`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                unit_id: this.state.unit_names.indexOf(this.state.selected_unit),
                username: this.state.username,
                passphrase: this.state.passphrase,
                first_name: this.state.first_name,
                last_name: this.state.last_name
              }),
            credentials: 'include'
           });
        if(response.status === 401){
            alert('Username already taken. Please input another.')
        } else if (response.status === 200){
            const resDetails = await response.json();
            alert(`Welcome ${resDetails.first_name} ${resDetails.last_name}!`)
            this.props.history.push('/authenticated_user/home')
        } else{
            alert('Error')
        }
    }

    render() {
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit = {this.handleRegistration}>
                    <label>Unit:
                        <select name='selected_unit' value={this.state.selected_unit} onChange={this.handleInput}>
                            <option key="empty" value=""></option>
                            {this.state.unit_names.map(unit => <option value={unit}> {unit}</option>)}
                        </select>
                    </label>
                    <br/>
                    <label>Username: 
                        <input type='text' name='username' value={this.state.username} onChange={this.handleInput}></input>
                    </label>
                    <br/>
                    <label>Password: 
                        <input type='password' name='passphrase' value={this.state.passphrase} onChange={this.handleInput}></input>
                    </label>
                    <br/>
                    <label>Confirm Password: 
                    <input type='password' name='confirmPassphrase' value={this.state.confirmPassphrase} onChange={this.handleInput}></input>
                    </label>
                    <br/>
                    <label>First Name: 
                    <input type='text' name='first_name' value={this.state.first_name} onChange={this.handleInput}></input>
                    </label>
                    <br/>
                    <label>Last Name: 
                    <input type='text' name='last_name' value={this.state.last_name} onChange={this.handleInput}></input>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <label>Already have an account? </label>
                <a className="nav-link" href="/login">Login </a>
            </div>
        )
    }

}


export default RegisterMain;