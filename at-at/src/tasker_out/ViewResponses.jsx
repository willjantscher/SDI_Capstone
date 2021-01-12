import React from "react";


class ViewResponses extends React.Component {
    
  render() {
    const {responses, viewResponses, hide} = this.props
    return(
      <div> 
            <label id="1"> Received Responses</label> <br></br>
            <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={viewResponses} id="1"> View</button>
            {responses.length > 0 ? <button className ="rux-button" type="submit" onClick={hide}> Hide</button> 
            : " "}

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
                