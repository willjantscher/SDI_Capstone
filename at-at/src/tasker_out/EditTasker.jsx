import React from "react";

class EditTasker extends React.Component {
  
  render() {
    return(
      <div> 
               <form onSubmit={this.props.update}>
                    {this.props.v ? <label id='tid'> Tasker ID</label>: ""}{" "}
                    {this.props.v ? <input id='tid' type='text' name='tid' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                  
                    {this.props.v ? <label id='vnum'> Version #</label>: ""}{" "}
                    {this.props.v ? <input id='vnum' type='text' name='vnum' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                  
                    {this.props.v ? <label id='update'> Date of Update</label>: ""}{" "}
                    {this.props.v ? <input id='update' type='text' name='update' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                  
                    {this.props.v ? <label id='tasler_name'> Tasker Name </label>: ""}{" "}
                    {this.props.v ? <input id='tasker_name' type='text' name='tasker_name' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>

                    {this.props.v ? <label id='suspense'> Suspense Date</label>: ""}{" "}
                    {this.props.v ? <input id='suspense' type='text' name='suspense' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                  
                    {this.props.v ? <label id='priority'> Priority </label>: ""}{" "}
                    {this.props.v ? <input id='priority' type='text' name='priority' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                  
                    {this.props.v ? <label id='workload'>Est. Workload </label>: ""}{" "}
                    {this.props.v ? <input id='workload' type='text' name='workload'
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                    
                    {this.props.v ? <label id='desc'> Description </label>: ""}{" "}
                    {this.props.v ? <input id='desc' type='text' name='desc' 
                    onChange={this.props.handleEdit}/>: ""}{" "}<br></br>
                    
                    {this.props.v ? <input type='submit' value="Submit"/>: ""}
                    <br></br><br></br>
              </form>
      </div>
    )
  }
}

export default EditTasker;

                  {

                  //<td>{this.props.vis ? <input type='text' name='update-on' value={this.props.stateValue[2]} 
                  //onChange={this.props.handleEdit}></input>: ""}</td>

                  // <td>{this.props.vis ? <input type='text' name='tasker_name' value={this.props.stateValue[3]} 
                  // onChange={this.props.taskhandleEditers}></input>: ""}</td>

                  // <td>{this.props.vis ? <input type='text' name='suspense' value={this.props.stateValue[4]} 
                  // onChange={this.props.handleEdit}></input>: ""}</td>

                  // <td>{this.props.vis ? <input type='text' name='priority' value={this.props.stateValue[5]} 
                  // onChange={this.props.handleEdit}></input>: ""}</td>

                  // <td>{this.props.vis ? <input type='text' name='workload' value={this.props.stateValue[6]} 
                  // onChange={this.props.handleEdit}></input>: ""}</td>

                  // <td>{this.props.vis ? <input type='text' name='desc' value={this.props.stateValue[7]} 
                  // onChange={this.props.handleEdit}></input>: ""}</td>

        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[0]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[1]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[2]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[3]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[4]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[5]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[6]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[7]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[8]);return;}): ""}
        // {this.props.taskers.length > 0 ? this.props.taskers.map((res, i) => {console.log(Object.keys(res)[9]);return;}): ""}
}