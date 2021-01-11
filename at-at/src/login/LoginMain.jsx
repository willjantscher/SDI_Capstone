import React from "react"
import { Redirect } from "react-router-dom";
import isAuthed from './utils';

class LoginMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: ''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }    

    handleLogin = async (event) => {
        event.preventDefault()
        const response = await fetch(`http://localhost:3001/login/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                passphrase: this.state.passphrase,
              }),
            credentials: 'include'
           });

        if(response.status === 401){
            alert("Incorrect password.")
        } else if(response.status === 404){
            alert("Username not found. Please register first.")
        } else if(response.status === 200){
            const resDetails = await response.json();
            alert(`Welcome ${resDetails.first_name} ${resDetails.last_name}!`)
            this.props.history.push('/authenticated_user/home')
        } else {
            alert('Error')
        }
    }

    render() {
      if (isAuthed()) {
        return (<Redirect to="/authenticated_user/home"/>);
      } else {
        return(
            <div>
                <h1>AT-AT</h1>
                <h2>Login</h2>
                <div className="rux-form-field__label"></div>
                <form className="container-fluid" onSubmit = {this.handleLogin}>
                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="username" className="col-sm-1" >Username:</label>
                        <input
                            className="rux-input col-md-2 will-colors"
                            id="username"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        ></input>
                    </div>
                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="passphrase" className="col-sm-1" >Password:</label>
                        <input
                            className="rux-input col-md-2 will-colors"
                            id="passphrase"
                            type="password"
                            name="passphrase"
                            value={this.state.passphrase}
                            onChange={this.handleInput}
                        ></input>
                    </div>
                    <div className="row pb-3 pl-5">
                        <input className="will-colors rux-button" type="submit" value="Login"/>
                    </div>
                </form>
                
                <label> 
                    <a className="nav-link" href="/register">Not on AT-AT yet? Register here</a>
                </label> 
            </div>
        )
      }
    }

}

export default LoginMain;

