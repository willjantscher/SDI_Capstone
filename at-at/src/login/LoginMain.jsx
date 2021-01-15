import React from "react"
import { Redirect } from "react-router-dom";
import isAuthed from './utils';
import './card.css';
import video from "../img/AT-AT_intro_smaller.mp4"


const apiURL = 'http://localhost:3001';

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
        const response = await fetch(`${apiURL}/login/authenticate`, {
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
            <>
            <rux-classification-marking classification="unclassified" label=""></rux-classification-marking>
            <rux-global-status-bar appname="Aggregate Tasker Administration Tool" version="1.1.0" theme="dark" style={{ marginTop : '20px', height : '80px' }}>     </rux-global-status-bar>
            <div className="container-fluid " align="center" >
                <div className="row">
                <div className="col"/>
                <div className="card card-container" style={{marginTop:"100px"}}>
                    <div className="rux-form-field__label"></div>
                    <form className="container-fluid ">
                        <h1 className="pb-4 pt-4" >Login</h1>
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <label htmlFor="username" className="col-5 pt-1" >Username:</label>
                            <input
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className="rux-input col-7 will-colors"
                                id="username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInput}
                            ></input>
                        </div>
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <label htmlFor="passphrase" className="col-5 pt-1" >Password:</label>
                            <input
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className="rux-input col-7 will-colors"
                                id="passphrase"
                                type="password"
                                name="passphrase"
                                value={this.state.passphrase}
                                onChange={this.handleInput}
                            ></input>
                        </div>
                        <div className="row pt-3 pb-3"> 
                            <div className="col"/>
                            <rux-button onClick={this.handleLogin}>Login</rux-button>
                            <div className="col"/>
                        </div>
                        <div className="row pt-3 pb-4"> 
                        <div className="col">
                            <label align="center"> 
                                Need an account?
                                <a className="nav-link" href="/register"> Register</a>
                            </label>
                        </div>
                        </div>
                    </form> 
                </div >
                <div className="col"></div>
                </div>
                <div className="" style={{marginTop:"100px", marginBottom:"100px"}} >
                    <div className="video-mask" > 
                        <video className="video"autoPlay muted >
                            <source src={video} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            </>
        )
      }
    }

}

export default LoginMain;

