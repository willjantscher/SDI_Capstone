import React from "react"
import Cookies from 'universal-cookie';

class RegisterMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: '',
            confirmPassphrase: '',
            unit_id: '',
            first_name: '',
            last_name: ''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    handleRegistration = async () => {
        if(this.state.passphrase != this.state.confirmPassphrase){
            alert('Passwords must match')
            return
        }
        const response = await fetch(`http://localhost:3001/register`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                unit_id: this.state.unit_id,
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
                <label>Unit Id: </label>
                <input type='text' name='unit_id' value={this.state.unit_id} onChange={this.handleInput}></input>
                <br/>
                
                <label>Username: </label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInput}></input>
                <br/>
                <label>Password: </label>
                <input type='password' name='passphrase' value={this.state.passphrase} onChange={this.handleInput}></input>
                <br/>
                <label>Confirm Password: </label>
                <input type='password' name='confirmPassphrase' value={this.state.confirmPassphrase} onChange={this.handleInput}></input>
                <br/>
                <label>First Name: </label>
                <input type='text' name='first_name' value={this.state.first_name} onChange={this.handleInput}></input>
                <br/>
                <label>Last Name: </label>
                <input type='text' name='last_name' value={this.state.last_name} onChange={this.handleInput}></input>
                <br/>
                <button onClick={this.handleRegistration}>Register</button>
                <br/><br/>
                <label>Already have an account? </label>
                <a className="nav-link" href="/login">Login </a>
            </div>
        )
    }

}


export default RegisterMain;