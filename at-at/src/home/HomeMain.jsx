import React from "react"
// import { RuxIcon } from '@astrouxds/rux-icon/rux-icon.js';


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
                {/* <rux-icon icon="notifications" label="Notifications"></rux-icon>
                <rux-icon icon="settings"></rux-icon>
                <rux-icon library="/icons/my-namespaced-custom-icons.svg" icon="my-namespaced-prefix_settings"></rux-icon> */}
                {/* <div position="relative" overflow="hidden">
                <rux-notification
                    open
                    // closeAfter="3500"
                    status="caution"
                    message="This is an important notification which will disappear in 3.5 seconds.">
                </rux-notification>
                </div> */}
            </div>
        )
    }

}


export default HomeMain;