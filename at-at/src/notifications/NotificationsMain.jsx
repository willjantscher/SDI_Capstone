import React from "react"
import NotificationViewer from "./NotificationViewer"


class NotificationsMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
                notifications: [],
        }
    }

    componentDidMount(){
        this.setState({notifications: ['test']})
    }

    componentDidUpdate(){

    }



    render() {
        return(
            <div> I am inside of the Notification page
            <NotificationViewer>

            </NotificationViewer>
            </div>
        )
    }

}


export default NotificationsMain;