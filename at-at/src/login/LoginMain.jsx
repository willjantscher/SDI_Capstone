import React from "react"


class LoginMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: '',
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
              })
           });
        if(response.status == 401){
            alert("Incorrect password or username")
        }
        const resDetails = await response.json();
        alert(`Welcome ${resDetails[0].first_name} ${resDetails[0].last_name}!`)
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
            </div>
        )
    }

}


export default LoginMain;