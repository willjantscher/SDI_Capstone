import React from "react";

class NotificationViewer extends React.Component {

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
            id={notification.id}
            value="X"/></td>
        </tr>
    )}

    notificationList = (notifications) => {
        return notifications.map(notification => 
            <tr key={notification.id}>
            <td>{notification.details}</td>
            <td><input 
                className="will-colors rux-button" 
                type="submit" 
                key={notification.id}
                onClick={this.props.onViewClick}
                id={notification.tasker_id}
                name={notification.notification_type}
                value="View"/></td>
            <td><input 
                className="will-colors rux-button" 
                type="submit" 
                key={notification.id} 
                onClick={this.props.onDelete}
                id={notification.id}
                value="X"/></td>
            </tr>
        )}    

    render() {
        return(
                <div className="container-fluid">

                    {/* <label id="1"><h1>Unread Notifications</h1></label>
                    <table className="rux-table">
                        <tbody>
                            {this.unreadNotificationList(this.props.notifications)}
                        </tbody>
                    </table>

                    <label id="1"><h1>Read Notifications</h1></label>
                    <table className="rux-table">
                        <tbody>
                            {this.readNotificationList(this.props.notifications)}
                        </tbody>
                    </table> */}

                    <label id="1"><h1>All Notifications</h1></label>
                    <table className="rux-table" key="allNotifications">
                        <tbody>
                            {this.notificationList(this.props.notifications)}
                        </tbody>
                    </table>

                </div>
            )
                }
}

export default NotificationViewer;