import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from "react-router-dom";


import Navbar from "./navbar/Navbar"
import LoginMain from "./login/LoginMain"
import TaskerCreationMain from "./tasker_creation/TaskerCreationMain"
import TaskerInboxMain from "./tasker_in/TaskerInboxMain"
import TaskerOutboxMain from "./tasker_out/TaskerOutboxMain"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >

        <Navbar/>

        <Router>
          <Route exact path="/" ><Redirect to="/login"></Redirect> </Route>
          <Route path="/login" component={LoginMain} />
          <Route path="/create_tasker" component={TaskerCreationMain} />
          <Route path="/tasker_inbox" component={TaskerInboxMain} />
          <Route path="/tasker_outbox" component={TaskerOutboxMain} />
        </Router>
      </div>

    )
  }
}

export default App;
