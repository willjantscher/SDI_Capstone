import React from "react"
import NotificationViewer from "./NotificationViewer"
import Cookies from 'universal-cookie';

class NotificationsMain extends React.Component {
    constructor(props) {
        super(props); 
        this.apiURL = 'http://localhost:3001';
        this.state = {
            unitId: 0,
            userId: 0,    
            notifications: ['did not update'],
            selectedNotification: {},
            selectedRow: [],
        }
    }

    componentDidMount = async() => {
        // get user authentication info
        let cookies = new Cookies();
        let user_id = cookies.get("user_id");  //cookie name is user_id
        let unit_id = cookies.get("unit_id");  //cookie name is unit_id

        if (unit_id !== undefined) {
            // get other data based on user unit
            const notifications = await this.fetchNotifications(unit_id);
            this.setState({unitId: unit_id, userId: user_id, notifications: notifications});
        }
    }

    fetchNotifications = async(unitId) => {
        const response = await fetch(`${this.apiURL}/notifications/${unitId}`, {method: 'GET'})
        const notifications = await response.json();
        return notifications;
    }
    handleNotificationClick = (e) => {
        const selectedRow = e.currentTarget;
        const selectedId = parseInt(selectedRow.id);
        const selectedNotification = this.state.notifications.find(notification => notification.notification_id === selectedId);
        this.setState({selectedRow: selectedRow, selectedNotification: selectedNotification});
      }

    render() {
        return(
            <div> NotificationsMain

            <NotificationViewer
                notifications = {this.state.notifications}
                selectedRow={this.state.selectedRow}
                onRowClick={this.handleNotificationClick}
            />
            </div>
        )
    }

}


export default NotificationsMain;