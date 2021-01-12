import React from "react";


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
                      <select id="SEL" className="rux-input col-md-2 will-colors" id='priority' type='' name='priority' onFocus={this.props.handleEdit}>
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
                      <textarea 
                        style={{borderRadius:'3px'}}
                        className="rux-form-field--large col-md-4 will-colors"
                        rows="10"
                        type='text'
                        name='desc'
                        id="desc_text"
                        placeholder="Tasker Description"
                        onChange={this.props.handleEdit} 
                    ></textarea>
                      <br></br>
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
