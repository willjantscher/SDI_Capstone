import React from "react";
import { RuxClock } from '@astrouxds/rux-clock/rux-clock.js';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { DateTime } from 'luxon';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxTabs } from '@astrouxds/rux-tabs/rux-tabs.js';

// Create a new table in the database with notifications
// in app home page, componenet did mount
// create a button with an image in the navbar that conditionally renders
// on-click will update notifications table with a read status
// create a page that has unread and read notifications




// delete notifications when tasker done or closed (originator vs tasked unit)




class Navbar extends React.Component {
  render() {
    return (
      <rux-global-status-bar appname="AT-AT" version="1.0">
        <rux-tabs id="tab-set-id-1">
          <rux-tab id="tab-id-1" selected="true"
            onClick={() => {this.props.history.push('/authenticated_user/home')}}
          >Home</rux-tab>
          <rux-tab small="true"id="tab-id-2"
            onClick={() => {this.props.history.push('/authenticated_user/create_tasker')}}
          >Create a Tasker</rux-tab>
          <rux-tab id="tab-id-3"
            onClick={() => {this.props.history.push('/authenticated_user/tasker_inbox')}}
          >Tasker In  Box</rux-tab>
          <rux-tab id="tab-id-4"
            onClick={() => {this.props.history.push('/authenticated_user/tasker_outbox')}}
          >Tasker Out Box</rux-tab>
        </rux-tabs>


        <rux-clock timezone={DateTime.local().zoneName} hideDate small></rux-clock>

        <rux-button
                    onClick={() => {this.props.history.push('/login')}}
          >Logout</rux-button>

      </rux-global-status-bar>

      // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      //   <div className="container-fluid">
      //     <a className="navbar-brand" href="/authenticated_user/home">
      //       Home
      //     </a>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-bs-toggle="collapse"
      //       data-bs-target="#navbarSupportedContent"
      //       aria-controls="navbarSupportedContent"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      //         <li className="nav-item">
      //           <a className="nav-link" href="/authenticated_user/create_tasker">
      //             Create a tasker
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/authenticated_user/tasker_inbox">
      //             View tasker inbox
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/authenticated_user/tasker_outbox">
      //             View tasker outbox
      //           </a>
      //         </li>
      //         {/* would want to conditionally render this item based on active notifications? */}
      //         <li className="nav-item">
      //           <a className="nav-link" href="/authenticated_user/notifications">
      //             Notifications
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" href="/login">
      //             Logout
      //           </a>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </nav>
    );
  }
}

export default Navbar;
