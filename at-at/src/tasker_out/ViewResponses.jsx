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

            <table className="rux-table">
                {responses.length > 0 ?
                    <tbody>
                        <tr>
                            <td><h3>Tasker ID</h3></td>
                            <td><h3>Assigned Unit ID</h3></td>
                            <td><h3>Status</h3></td>
                            <td><h3>Response</h3></td>
                        </tr>
                    </tbody>
                    :""} 

                    <tbody>
                        {responses.map((res, i) => 
                        <tr>
                            {Object.values(res).map(r => 
                            <td className="will-colors"><h3>{r}</h3>
                                
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
                