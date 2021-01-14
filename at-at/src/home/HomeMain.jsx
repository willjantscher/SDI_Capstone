import React from "react"
import video from "../img/AT-AT_intro_smaller.mp4"

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
            <center> 
                <video width="500" height="500" autoPlay muted>
                    <source src={video} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </center>
        )
    }

}


export default HomeMain;