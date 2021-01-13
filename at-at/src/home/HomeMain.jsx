import React from "react"
// import { RuxIcon } from '@astrouxds/rux-icon/rux-icon.js';
import HomeTaskerInbox from "./HomeTaskerInbox"
import NotificationsHome from "./NotificationsHome"

class HomeMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    render() {
        return(
            <div>
            {/* <NotificationsHome></NotificationsHome>
            <HomeTaskerInbox></HomeTaskerInbox> */}
            </div>
        )
    }

}


export default HomeMain;