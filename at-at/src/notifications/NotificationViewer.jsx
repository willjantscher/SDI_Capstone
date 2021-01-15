import React from "react";

class NotificationViewer extends React.Component {

    unreadNotificationList = (notifications) => {
        let result = notifications.filter(notification => !notification.isread).map(notification => 
        <tr key={notification.id}>
            <td>{notification.details}</td>
            <td><input 
                className="will-colors rux-button" 
                type="submit" 
                key={notification.id} 
                onClick={this.props.onViewClick}
                id={notification.tasker_id}
                name={notification.notification_type}
                value="View"/>
            </td>
        </tr>
    )
    if(result.length === 0) {
        result.push(<tr>
            <td>{'You have no new notifications.'}</td>
        </tr>)
    }
    return result;
}
    
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
        let result = notifications.map(notification => 
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
        )
        if(result.length === 0) {
            result.push(<tr>
                <td>{'Congratulations! You have no notifications. Sit back and enjoy your day.'}</td>
            </tr>)
        }
        return result;
    } 

    render() {
        return(
            
                <div className="container-fluid">
                    <div className="row pb-3 pl-3 pr-3"> 

                    <table className="rux-table will-colors">
                        <tbody>
                            {this.props.homepage ? this.unreadNotificationList(this.props.notifications) : this.notificationList(this.props.notifications)}
                        </tbody>
                    </table>
                    </div>

                </div>
            )
                }
}

export default NotificationViewer;