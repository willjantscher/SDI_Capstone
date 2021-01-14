// import './App.css';
import './astro.css';
import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";

import Navbar from "./navbar/Navbar";
import LoginMain from "./login/LoginMain";
import RegisterMain from "./login/RegisterMain";
import UserProfileMain from "./login/UserProfileMain";
import PrivateRoute from './login/PrivateRoute';
import HomeMain from "./home/HomeMain";
import HomeTaskerInbox from "./home/HomeTaskerInbox";
import TaskerCreationMain from "./tasker_creation/TaskerCreationMain";
import TaskerInboxMain from "./tasker_in/TaskerInboxMain";
import TaskerOutboxMain from "./tasker_out/TaskerOutboxMain";
import NotificationsMain from "./notifications/NotificationsMain";
import NotificationsHome from "./home/NotificationsHome";
import 'bootstrap/dist/css/bootstrap-grid.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <body>
        <Router>
          <Route exact path="/" ><Redirect to="/login"></Redirect> </Route>
          <Route path="/login" component={LoginMain} />
          <Route path="/register" component={RegisterMain} />
          <PrivateRoute path="/authenticated_user" component={Navbar} />
          <PrivateRoute path="/authenticated_user/home" component={HomeMain} />
          <PrivateRoute path="/authenticated_user/home" component={NotificationsHome} /> 
          <PrivateRoute path="/authenticated_user/home" component={HomeTaskerInbox} />
          <PrivateRoute path="/authenticated_user/create_tasker" component={TaskerCreationMain} />
          <PrivateRoute path="/authenticated_user/tasker_inbox" component={TaskerInboxMain} />
          <PrivateRoute path="/authenticated_user/tasker_outbox" exact component={TaskerOutboxMain} />
          <PrivateRoute path="/authenticated_user/notifications" component={NotificationsMain} />
          <PrivateRoute path="/authenticated_user/user_profile" component={UserProfileMain} />
        </Router>
        <footer className="footer">
          <div>@ 2021 The Empire Inc. All Rights Reserved. </div>
          <div>
            <a style={{color:"cyan"}}href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=RickRoll">www.theEmpire.com</a>
          </div>
        </footer>
      </body>

    )
  }
}

export default App;
