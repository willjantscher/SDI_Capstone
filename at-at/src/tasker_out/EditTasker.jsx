import React from "react";

const prioritySel = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 }
];

class EditTasker extends React.Component {

  render() {
    return(
      <div className="container-fluid" > 
            {this.props.delVis ?
            <div style={{fontWeight: "bold"}} style={{color: "red"}}> Are you sure you want to delete tasker {this.props.taskers[this.props.index].tasker_id}? <br></br>
            <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={this.props.delete}>Final Delete</button>{' '}
            <button className ="rux-button" type="submit" onClick={this.props.hide}>Cancel</button>
            </div> : ''}

            <br></br> {this.props.v ?
               <form  onSubmit={this.props.update}>

                  <div className="row pb-3">
                    <label className="col-md-2" id='tid'> Tasker ID</label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus value={this.props.taskers[this.props.index].tasker_id} id='tid' type='text' name='tid' 
                    onFocus={this.props.handleEdit}/> <br></br>
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='vnum'> Version #</label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus id='vnum' type='number' min={this.props.taskers[this.props.index].version_num} name='vnum' 
                    onChange={this.props.handleEdit}/><br></br>      
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='update'> Date of Update</label>{' '}
                    <input className="rux-input col-md-2 will-colors" id='update' type='date' name='update' 
                    onChange={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='tasker_name'> Tasker Name </label>{' '}
                    <input className="rux-input col-md-2 will-colors" id='tasker_name' type='text' name='tasker_name' 
                    onChange={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                      <label className="col-md-2"id='suspense'> Suspense Date</label>{' '}
                      <input className="rux-input col-md-2 will-colors" id='suspense' type='date' name='suspense' 
                      onChange={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                      <label className="col-md-2" id='priority'> Priority </label>{' '}
                      <select id="SEL" className="rux-input col-md-2 will-colors" id='priority' type='' name='priority' onChange={this.props.handleEdit}>
                         <option id="SEL" value="Low">Low</option>
                         <option id="SEL" value="Low">Medium</option>
                         <option id="SEL" value="High">High</option>
                      </select>
                      <br></br>
                  </div>

                  <div className="row pb-3">
                     <label className="col-md-2" id='workload'>Est. Workload </label>{' '}
                      <input className="rux-input col-md-2 will-colors" min="1" id='workload' placeholder="Hours" type='number' name='workload'
                      onChange={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">  
                      <label className="col-md-2" id='desc'> Description </label>{' '}
                      <textarea className="rux-input col-md-2 will-colors" id='desc' type='text' name='desc' 
                      onChange={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">  
                     <input style={{float: 'left'}} className ="rux-button" type='submit' value="Submit"/>{' '}
                     <button  className ="rux-button" onClick={this.props.hide}>Cancel</button>
                  </div><br></br><br></br>

              </form> :''}
      </div>
    )
  }
}

export default EditTasker;
