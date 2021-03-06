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
                    <thead>
                        <tr>
                            <th><h3>Tasker ID</h3></th>
                            <th><h3>Assigned Unit ID</h3></th>
                            <th><h3>Status</h3></th>
                            <th><h3>Response</h3></th>
                        </tr>
                    </thead>
                    :""} 

                    <tbody>
                        {responses.map((res, i) => 
                        <tr className="will-colors" id={i} onClick={this.props.onRowClick}>
                            {Object.values(res).filter((r, index) => index !== 4).map(r => 
                            <td>
                                {r}
                            </td>)}
                        </tr>)}
                    </tbody>
            </table><br></br>

            <table className="rux-table">
                    <tbody>
                        <tr>
                            <td>
                                <p
                                    className="mt-3 ml-2"
                                    id="taskerDetails"
                                    style={{width: "100%", wordBreak: "break-word", whiteSpace: "normal"}}
                                ><h3>Attachments: </h3>{" "}
                                    {this.props.selectedResponse.desc_text}
                                </p>
                            </td>
                        </tr>
                        {this.props.responseAttachments.length > 0
                        ? <tr>
                            <td>
                                <ul>
                                    {this.props.getAttachmentNames(this.props.responseAttachments, true)}
                                </ul>
                            </td>
                        </tr>
                        : ""}
                        
                    </tbody>
                </table>
            <br></br>
       </div>
        )
    }
}

export default ViewResponses;
                