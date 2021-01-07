// import './App.css';
import './astro.css';
import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";


import Navbar from "./navbar/Navbar"
import LoginMain from "./login/LoginMain"
import HomeMain from "./home/HomeMain"
import TaskerCreationMain from "./tasker_creation/TaskerCreationMain"
import TaskerInboxMain from "./tasker_in/TaskerInboxMain"
import TaskerOutboxMain from "./tasker_out/TaskerOutboxMain"
import NotificationsMain from "./notifications/NotificationsMain"

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div >
        {/* <button class="rux-button" color="blue">
          Button with Icon using Astro UXDS Icon Web Component
        </button>
        <button class="rux-button rux-button--icon">
          <rux-icon class="rux-icon rux-button__icon" icon="caution" color="white"></rux-icon>
          Button with Icon using Astro UXDS Icon Web Component
        </button>

        <button class="rux-button rux-button--icon">
          <div class="rux-icon rux-button__icon">
            <svg></svg>
          </div>
          Button with Local Icon
        </button> */}



        <Router>
          <Route exact path="/" ><Redirect to="/login"></Redirect> </Route>
          <Route path="/login" component={LoginMain} />
          <Route path="/authenticated_user" component={Navbar} />
          <Route path="/authenticated_user/home" component={HomeMain} />
          <Route path="/authenticated_user/create_tasker" component={TaskerCreationMain} />
          <Route path="/authenticated_user/tasker_inbox" component={TaskerInboxMain} />
          <Route path="/authenticated_user/tasker_outbox" component={TaskerOutboxMain} />
          <Route path="/authenticated_user/notifications" component={NotificationsMain} />
        </Router>
      </div>

    )
  }
}

export default App;
