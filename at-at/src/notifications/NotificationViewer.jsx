import React from "react";

const NotificationViewer = (props) => {

    let notificationList = props.notifications.map((notification => <li>{notification}</li>))

    return(
            <div>
                NotificationViewer
                <ul> {notificationList}</ul>
            </div>
        )
}

export default NotificationViewer;