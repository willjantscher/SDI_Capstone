import React from "react"

class HomeMain extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            logged_in : null,
        }
    }

    componentDidMount() {
      //get all the navbar tabs, deselect all, then select tasker inbox tab
      let tabs = Array.from(document.querySelectorAll('rux-tab'))
      tabs.forEach((tab) => tab.selected = false)
      tabs[0].selected = true
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