import React from "react";

class NotificationViewer extends React.Component {

    //let unreadNotificationList = props.notifications.map((notification => {if(notification.isRead === false); return <li>{notification.details}</li>}))
    unreadNotificationList = (notifications) => {
        return notifications.filter(notification => !notification.isread).map(notification => 
        <tr key={notification.id}>
            <td>{notification.details}</td>
            {/* <td><button type="submit" key={notification.id}>view</button></td> */}
            <td><input 
                className="will-colors rux-button" 
                type="submit" 
                key={notification.id} 
                onClick={this.props.onViewClick}
                id={notification.tasker_id}
                value="View"/>
            </td>
        </tr>
    )}
    
    readNotificationList = (notifications) => {
    return notifications.filter(notification => notification.isread).map(notification => 
        <tr key={notification.id}>
        <td>{notification.details}</td>
        <td><input 
            className="will-colors rux-button" 
            type="submit" 
            key={notification.id}
            onClick={this.props.onViewClick}
            id={notification.tasker_id}
            value="View"/></td>
        <td><input 
            className="will-colors rux-button" 
            type="submit" 
            key={notification.id} 
            onClick={this.props.onDelete}
            id={notification.tasker_id}
            value="X"/></td>
        </tr>
    )}
    // let allNotificationList = props.notifications.map(notification => <li>{notification.details}</li>)

    render() {
        return(
                <div className="container-fluid">
                    <table className="container-fluid">
                        <thead className="row">
                            <tr>
                                <th>New Notifications</th>
                            </tr>
                        </thead>
                        <tbody className="row">{this.unreadNotificationList(this.props.notifications)}</tbody>
                    </table>

                    <table className="container-fluid">
                        <thead className="row">
                            <tr>
                                <th>Old Notifications</th>
                            </tr>
                        </thead>
                    <tbody className="row">{this.readNotificationList(this.props.notifications)}</tbody>
                    {/* {props.notifications.filter(notification => notification.isread).map(notification => 
                    <tr>
                    <td>{notification.details}</td>
                    <td><button type="submit" key={notification.id}>view</button></td>
                    <td><button type="submit" key={notification.id}>delete</button></td>
                    </tr>)} */}
                    </table>
                    {/* All Notifications
                    <ul>{allNotificationList}</ul> */}

                </div>
            )
                }
}

export default NotificationViewer;