import React from "react"


class HomeMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    render() {
        return(
            <div> I am inside of the Home Main page</div>
        )
    }

}


export default HomeMain;