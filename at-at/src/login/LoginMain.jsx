import React from "react"
import Cookies from 'universal-cookie';

class LoginMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: '',
            unit_id: '',
            first_name: '',
            last_name: ''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    handleLogin = async () => {
        const response = await fetch(`http://localhost:3001/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                passphrase: this.state.passphrase,
              }),
            credentials: 'include'
           });

        if(response.status == 401){
            alert("Incorrect password or username.")
        } else if(response.status == 404){
            alert("Username not found. Please register first.")
        } else {
            const resDetails = await response.json();
            alert(`Welcome ${resDetails.first_name} ${resDetails.last_name}!`)
            let cookies = new Cookies();
            alert("user_id " + cookies.get("user_id"))
            alert("unit_id " + cookies.get("unit_id"))
            this.props.history.push('/create_tasker')
        }
    }

    handleRegistration = async () => {
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
        const resDetails = await response.json();
        alert(`Welcome ${resDetails.first_name} ${resDetails.last_name}!`)
        let cookies = new Cookies();
        alert("user_id " + cookies.get("user_id"))
        alert("unit_id " + cookies.get("unit_id"))
        this.props.history.push('/create_tasker')
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <label>Username: </label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInput}></input>
                <br/>
                <label>Password: </label>
                <input type='text' name='passphrase' value={this.state.passphrase} onChange={this.handleInput}></input>
                <br/>
                <button onClick={this.handleLogin}>Login</button>
                <br/>
                <h1>Register</h1>
                <label>Unit Id: </label>
                <input type='text' name='unit_id' value={this.state.unit_id} onChange={this.handleInput}></input>
                <br/>
                <label>Username: </label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInput}></input>
                <br/>
                <label>Password: </label>
                <input type='text' name='passphrase' value={this.state.passphrase} onChange={this.handleInput}></input>
                <br/>
                <label>First Name: </label>
                <input type='text' name='first_name' value={this.state.first_name} onChange={this.handleInput}></input>
                <br/>
                <label>Last Name: </label>
                <input type='text' name='last_name' value={this.state.last_name} onChange={this.handleInput}></input>
                <br/>
                <button onClick={this.handleRegistration}>Register</button>
            </div>
        )
    }

}

export default LoginMain;

