import React from "react";

class EditTasker extends React.Component {
  
  render() {
    return(
      <div > 
            {this.props.delVis ?
            <div style={{fontWeight: "bold"}} style={{color: "red"}}> Are you sure you want to delete tasker {this.props.taskers[this.props.index].tasker_id}? <br></br>
            <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={this.props.delete}>Final Delete</button>{' '}
            <button className ="rux-button" type="submit" onClick={this.props.hide}>Cancel</button>
            </div> : ''}

            {this.props.v ?
               <form onSubmit={this.props.update}>
                    <label id='tid'> Tasker ID</label>{' '}
                    <input autoFocus value={this.props.taskers[this.props.index].tasker_id} id='tid' type='text' name='tid' 
                    onFocus={this.props.handleEdit}/> <br></br>
                  
                    <label id='vnum'> Version #</label>{' '}
                    <input autoFocus id='vnum' type='number' name='vnum' 
                    onChange={this.props.handleEdit}/><br></br>
                  
                    <label id='update'> Date of Update</label>{' '}
                    <input id='update' type='date' name='update' 
                    onChange={this.props.handleEdit}/><br></br>
                  
                    <label id='tasker_name'> Tasker Name </label>{' '}
                    <input id='tasker_name' type='text' name='tasker_name' 
                    onChange={this.props.handleEdit}/><br></br>

                    <label id='suspense'> Suspense Date</label>{' '}
                    <input id='suspense' type='date' name='suspense' 
                    onChange={this.props.handleEdit}/><br></br>
                  
                    <label id='priority'> Priority </label>{' '}
                    <input id='priority' type='' name='priority' 
                    onChange={this.props.handleEdit} placeholder="High, Medium, or Low"/><br></br>
                  
                    <label id='workload'>Est. Workload (Hours)</label>{' '}
                    <input id='workload' type='number' name='workload'
                    onChange={this.props.handleEdit}/><br></br>
                    
                    <label id='desc'> Description </label>{' '}
                    <textarea id='desc' type='text' name='desc' 
                    onChange={this.props.handleEdit}/><br></br>
                    
                    <input style={{float: 'left'}} className ="rux-button" type='submit' value="Submit"/>{' '}
                    <button  className ="rux-button" onClick={this.props.hide}>Cancel</button>
                    <br></br><br></br>
              </form> :''}
      </div>
    )
  }
}

export default EditTasker;
