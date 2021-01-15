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
        }
    }

    componentDidMount = async() => {
        //get all the navbar tabs, deselect all, then select tasker inbox tab
        let tabs = Array.from(document.querySelectorAll('rux-tab'))
        tabs.forEach((tab) => tab.selected = false)
        tabs[1].selected = true

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

        fetch(`${this.apiURL}/notifications/${unitId}`, {
            method: 'POST',
            }).then((res) => console.log(res.json()));

        const notifications = await response.json();
        // console.log(notifications)
        return notifications;
    }
    handleNotificationClick = async(e) => {
        const tasker_id = parseInt(e.target.id);
        const notificationType = e.target.name;
        console.log(tasker_id, notificationType)
        if(notificationType === 'tasker'){
            this.props.history.push({
                pathname: '/authenticated_user/tasker_inbox',
                state: {
                    tasker_id: tasker_id
                }
            });
        } 
        else if(notificationType === 'response') {
            this.props.history.push({
                pathname: '/authenticated_user/tasker_outbox',
                state: {
                    tasker_id: tasker_id
                }
            })
        }

//        app.get('/inbox/taskers/:unitId', taskerInQueries.getIncomingTaskers);

        // const response = await fetch(`${this.apiURL}/inbox/taskers/${unitId}`, {method: 'GET'})
        // const taskers = await response.json();
        // return taskers;
      }

    handleDelete = (e) => {
        e.preventDefault();
        const notificationId = parseInt(e.target.id);
        fetch(`${this.apiURL}/notifications/${notificationId}`, {
            method: 'DELETE',
        }).then((res) => console.log(res.json()));

        const newList = this.state.notifications.filter(i => i.id !== notificationId)
        this.setState({notifications: newList})
    }

    render() {
        return(
            <div className="container-fluid">   
                 <h1 className="pl-4 pb-4 pt-2">Notifications</h1>
                  <NotificationViewer
                    notifications = {this.state.notifications}
                    onViewClick={this.handleNotificationClick}
                    onDelete={this.handleDelete}
                 />
            </div>
        )
    }

}


export default NotificationsMain;