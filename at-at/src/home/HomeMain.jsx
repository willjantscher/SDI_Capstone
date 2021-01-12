import React from "react"
// import { RuxIcon } from '@astrouxds/rux-icon/rux-icon.js';
import HomeTaskerInbox from "./HomeTaskerInbox"

class HomeMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    render() {
        return(
            <div> We would be honored if you would join us...
                <rux-notification open message="You have received new taskers!" status='critical' closeAfter></rux-notification>

<body>
    <p style={{color:'blue'}}>
      I'm a big, blue, <strong>strong</strong> paragraph
    </p>
  </body>
                Tasker In Box Preview:
            </div>
        )
    }

}


export default HomeMain;