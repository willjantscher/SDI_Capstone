import React from "react";
import UnitsDropdown from "./UnitsDropdown"
import './card.css';

const apiURL = 'http://localhost:3001';

class RegisterMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            username: '',
            passphrase: '',
            confirmPassphrase: '',
            first_name: '',
            last_name: '',
            selected_unit: '',
            units: [{}]
        }
    }

    componentDidMount = () => {
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

    handleRegistration = async (event) => {
        event.preventDefault()
        if(this.state.passphrase !== this.state.confirmPassphrase){
            alert('Passwords must match.')
            return
        }
        if(!this.state.selected_unit || !this.state.username || !this.state.passphrase || !this.state.first_name || !this.state.last_name){
            alert('Please fill all fields.')
            return
        }

        const unit_id = this.state.units.filter(unit => 
            unit.unit_name === this.state.selected_unit)[0].unique_id

        const response = await fetch(`${apiURL}/login/register`, {
            method: 'POST',
            headers: { 'Content-Type':  'application/json' },
            body: JSON.stringify({
                unit_id: unit_id,
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
            <>
            <rux-classification-marking classification="unclassified" label=""></rux-classification-marking>
            <rux-global-status-bar appname="Aggregate Tasker Administration Tool" version="1.0" theme="dark" style={{ marginTop : '20px', height : '80px' }}>     </rux-global-status-bar>
            <div className="container " align="center">
                <div class="row">
                <div class="col"></div>
                <div class="card card-container" style={{marginTop:"100px", marginBottom:"100px"}}>
                    <div className="rux-form-field__label"></div>
                    <form className="container-fluid">
                        <h1 className="pb-4 pt-4" >Register</h1>
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <label htmlFor="first_name" className="col-5 pt-1" >First Name:</label>
                            <input
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className="rux-input col-7 will-colors"
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.handleInput}
                            ></input>
                        </div>
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <label htmlFor="last_name" className="col-5 pt-1" >Last Name:</label>
                            <input
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className="rux-input col-7 will-colors"
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.handleInput}
                            ></input>
                        </div>
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <UnitsDropdown                    
                            units = {this.state.units}
                            onUnitSelection = {this.handleInput}     
                            select_name = 'selected_unit'    
                            register = {true}                              
                            />
                        </div>
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
                        <div className="row pb-3 pl-5 pr-5" align="left"> 
                            <label htmlFor="confirmPassphrase" className="col-5 pt-1" >Confirm Password:</label>
                            <input
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className="rux-input col-7 will-colors"
                                id="passphrase"
                                type="password"
                                name="confirmPassphrase"
                                value={this.state.confirmPassphrase}
                                onChange={this.handleInput}
                            ></input>
                        </div>
                        <div className="row pt-3 pb-3"> 
                            <div class="col"/>
                            <rux-button onClick={this.handleRegistration}>Register</rux-button>
                            <div class="col"/>
                        </div>
                        <div className="row pt-3 pb-4"> 
                        <div className="col">
                            <label align="center"> 
                                Already have an account?
                                <a className="nav-link" href="/login"> Login</a>
                            </label>
                        </div>
                        </div>
                    </form>
                </div>
                <div class="col"></div>
                </div>
            </div>
            </>
        )
    }

}


export default RegisterMain;