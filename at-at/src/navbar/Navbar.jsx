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
      <rux-global-status-bar appname="AT-AT" version="1.0" theme="dark">
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
    );
  }
}

export default Navbar;
