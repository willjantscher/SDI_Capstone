import React from "react";
import UnitsDropdown from "./UnitsDropdown"

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
            <div>
                <h1 className="pl-4 pb-2 pt-2">AT-AT</h1>
                <h2 className="pl-4 pb-2 pt-2">Register</h2>              
                <div className="rux-form-field__label"></div>
                <form className="container-fluid" onSubmit = {this.handleRegistration}>
                    <UnitsDropdown                    
                        units = {this.state.units}
                        onUnitSelection = {this.handleInput}     
                        select_name = 'selected_unit'                                  
                    />
                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="username" className="col-sm-2" >Username:</label>
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
                        <label htmlFor="passphrase" className="col-sm-2" >Password:</label>
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
                        <label htmlFor="confirmPassphrase" className="col-sm-2" >Confirm Password:</label>
                        <input
                            className="rux-input col-md-2 will-colors"
                            id="passphrase"
                            type="password"
                            name="confirmPassphrase"
                            value={this.state.confirmPassphrase}
                            onChange={this.handleInput}
                        ></input>
                    </div>

                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="first_name" className="col-sm-2" >First Name:</label>
                        <input
                            className="rux-input col-md-2 will-colors"
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleInput}
                        ></input>
                    </div>

                    <div className="row pb-3 pl-5"> 
                        <label htmlFor="last_name" className="col-sm-2" >Last Name:</label>
                        <input
                            className="rux-input col-md-2 will-colors"
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleInput}
                        ></input>
                    </div>

                    <div className="row pb-3 pl-5">
                        <input className="will-colors rux-button" type="submit" value="Register"/>
                    </div>
                </form>
                <label className="pl-4 pb-4 pt-2">Already have an account? 
                    <a className="nav-link" href="/login"> Login here</a>
                </label>
            </div>
        )
    }

}


export default RegisterMain;