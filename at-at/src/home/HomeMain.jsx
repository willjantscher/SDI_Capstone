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
                <rux-icon icon="not
                ifications" label="Notifications"></rux-icon>
            </div>
        )
    }

}


export default HomeMain;