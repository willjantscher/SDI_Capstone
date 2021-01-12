import React from "react";

const NotificationViewer = (props) => {

    //let unreadNotificationList = props.notifications.map((notification => {if(notification.isRead === false); return <li>{notification.details}</li>}))
    let unreadNotificationList = props.notifications.filter(notification => !notification.isread).map(notification => <td>{notification.details}</td>)
    let readNotificationList = props.notifications.filter(notification => notification.isread).map(notification => 
    <tr>
        <td>{notification.details}</td>
        <td><button type="submit" key={notification.id}>view</button></td>
        <td><button type="submit" key={notification.id}>delete</button></td>
        </tr>)
    let allNotificationList = props.notifications.map(notification => <li>{notification.details}</li>)

    return(
            <div>
                Unread Notifications
                <table>
                <tr>{unreadNotificationList}</tr>
                </table>

                Read Notifications
                <table>
                {readNotificationList}
                {/* {props.notifications.filter(notification => notification.isread).map(notification => 
                <tr>
                <td>{notification.details}</td>
                <td><button type="submit" key={notification.id}>view</button></td>
                <td><button type="submit" key={notification.id}>delete</button></td>
                </tr>)} */}
                </table>
                All Notifications
                <ul>{allNotificationList}</ul>

            </div>
        )
}

export default NotificationViewer;