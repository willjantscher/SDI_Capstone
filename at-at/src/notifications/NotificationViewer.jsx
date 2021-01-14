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

    // generateEmptyNotificationList = () => {
    //     if(this.props.notifications.length === 0){
    //       return(
    //         <tr><td colSpan="6">Congratulations! You have no notifications. Sit back and enjoy your day.</td></tr>
    //       )
    //     }
    //   }    
      
    //   generateEmptyNotificationHomePage = () => {
    //     console.log(this.unreadNotificationList)
    //     if(this.unreadNotificationList.length === 0){
    //       return(
    //         <tr><td colSpan="6">You have no new notifications</td></tr>
    //       )
    //     }
    //   }

    render() {
        return(
                <div>

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

                    <label id="1"><h1>Notifications</h1></label>
                    <table className="rux-table" key="Notifications">
                        <tbody>
                            {/* {this.notificationList(this.props.notifications)} */}
                            {this.props.homepage ? this.unreadNotificationList(this.props.notifications) : this.notificationList(this.props.notifications)}
                            {/* {this.props.homepage ? this.generateEmptyNotificationHomePage() : this.generateEmptyNotificationList()} */}
                        </tbody>
                    </table>

                </div>
            )
                }
}

export default NotificationViewer;