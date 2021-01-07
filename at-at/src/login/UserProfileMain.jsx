import React from "react"
import Cookies from 'universal-cookie';

class UserProfileMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
            unit_name: '',
            username: '',
            first_name: '',
            last_name: '',
            perms: '',
        }
    }

    componentDidMount = () => {
        let cookies = new Cookies();
        let user_id = cookies.get("user_id");  //cookie name is user_id
        fetch(`http://localhost:3001/user/${user_id}`)
        .then(response => response.json())
        .then(user => 
            this.setState({
                unit_name: user.unit_name,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                perms: user.perms
            })
        )
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
                <br/>
                <label>Unit: {this.state.unit_name} </label>
                <br/>
                <label>Permissions:{this.state.perms ? this.state.perms : "None"} </label> 
                <br/>

            </div>
        )
    }

}


export default UserProfileMain;