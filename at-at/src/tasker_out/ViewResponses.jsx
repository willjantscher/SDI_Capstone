import React from "react";


class ViewResponses extends React.Component {

    componentDidMount(){
        this.props.viewResponses()
    }

    
  render() {
    const {responses, viewResponses, hide} = this.props
    return(

      <div className="container-fluid" > 
            <label id="1"><h1>Received Responses to My Taskers</h1></label>
            <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={viewResponses} id="1"> View</button>
            {responses.length > 0 ? <button className ="rux-button" type="submit" onClick={hide}> Hide</button> 
            : " "}<br></br><br></br>

            <table>
                {responses.length > 0 ?
                    <tbody>
                        <tr>
                            <td>Tasker ID</td>
                            <td>Assigned Unit ID</td>
                            <td>Status</td>
                            <td>Response </td>
                        </tr>
                    </tbody>
                    :""} 

                    <tbody>
                        {responses.map((res, i) => 
                        <tr>
                            {Object.values(res).map(r => 
                            <td>
                                {r}
                            </td>)}
                        </tr>)}
                    </tbody>
            </table>
            <br></br>
       </div>
        )
    }
}

export default ViewResponses;
                