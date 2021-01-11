// import './App.css';
import './astro.css';
import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";
import Cookies from 'universal-cookie';

import Navbar from "./navbar/Navbar";
import LoginMain from "./login/LoginMain";
import RegisterMain from "./login/RegisterMain";
import PrivateRoute from './login/PrivateRoute';
import HomeMain from "./home/HomeMain";
import TaskerCreationMain from "./tasker_creation/TaskerCreationMain";
import TaskerInboxMain from "./tasker_in/TaskerInboxMain";
import TaskerOutboxMain from "./tasker_out/TaskerOutboxMain";
import NotificationsMain from "./notifications/NotificationsMain";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" ><Redirect to="/login"></Redirect> </Route>
          <Route path="/login" component={LoginMain} />
          <Route path="/register" component={RegisterMain} />
          <PrivateRoute path="/authenticated_user" component={Navbar} />
          <PrivateRoute path="/authenticated_user/home" component={HomeMain} />
          <PrivateRoute path="/authenticated_user/create_tasker" component={TaskerCreationMain} />
          <PrivateRoute path="/authenticated_user/tasker_inbox" component={TaskerInboxMain} />
          <PrivateRoute path="/authenticated_user/tasker_outbox" exact component={TaskerOutboxMain} />
          <PrivateRoute path="/authenticated_user/notifications" component={NotificationsMain} />
        </Router>
      </div>

    )
  }
}

export default App;
