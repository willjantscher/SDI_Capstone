import React from "react";

import { RuxClock } from '@astrouxds/rux-clock/rux-clock.js';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { DateTime } from 'luxon';
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxTabs } from '@astrouxds/rux-tabs/rux-tabs.js';
import Cookies from 'universal-cookie';



class Navbar extends React.Component {

  removeCookies = () => {
    let cookies = new Cookies();
    if(cookies.get("unit_id")){
      cookies.remove("unit_id", {path: '/'})
      cookies.remove("user_id", {path: '/'})
    } else {
      alert("Sign in first!")
    }
  }

  logout = () => {
    this.removeCookies();
    this.props.history.push('/login');
  }

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
                    onClick={() => {this.logout()}}
        >Logout</rux-button>

      </rux-global-status-bar>
    );
  }
}

export default Navbar;
