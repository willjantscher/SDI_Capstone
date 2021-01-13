import React from "react"

class HomeMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    componentDidMount() {
      //get all the navbar tabs, deselect all, then select tasker inbox tab
      let tabs = Array.from(document.querySelectorAll('rux-tab'))
      tabs.forEach((tab) => tab.selected = false)
      tabs[0].selected = true
    }

    render() {
        return(
            <div> 
                <rux-notification open message="You have received new taskers!" status='critical' closeAfter></rux-notification>
                <h1>Tasker In Box Preview:</h1>
            </div>
        )
    }

}


export default HomeMain;