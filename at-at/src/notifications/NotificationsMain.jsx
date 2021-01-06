import React from "react"
import NotificationViewer from "./NotificationViewer"


class NotificationsMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
                notifications: ['did not update'],
                my_id : 1,
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3001/notifications/${this.state.my_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            this.setState({notifications: res})
        })
    }

    componentDidUpdate(){

    }



    render() {
        return(
            <div> NotificationsMain

            <NotificationViewer
                notifications = {this.state.notifications}
            />
            </div>
        )
    }

}


export default NotificationsMain;