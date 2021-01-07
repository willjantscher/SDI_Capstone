import React from "react"


class UserProfileMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    render() {
        return(
            <div> I am inside of the UserProfileMain page</div>
        )
    }

}


export default UserProfileMain;