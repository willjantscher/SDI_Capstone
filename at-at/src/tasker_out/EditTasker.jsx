import React from "react";


class EditTasker extends React.Component {

  render() {

    const {taskers, index} = this.props

    return(
      

      <div className="container-fluid" > 
            {this.props.delVis ?
            <div style={{fontWeight: "bold"}} style={{color: "red"}}> Are you sure you want to delete tasker {taskers[index].tasker_id}, Version # {taskers[index].version_num}? <br></br>
            <button style={{float: 'left'}} className ="rux-button" type="submit" onClick={this.props.delete}>Final Delete</button>{' '}
            <button className ="rux-button" type="submit" onClick={this.props.hide}>Cancel</button>
            </div> : ''}

            <br></br> {this.props.v ?
               <form  onSubmit={this.props.update}>

                  <div className="row pb-3">
                    <label className="col-md-2" id='tid'> Tasker ID</label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus value={taskers[index].tasker_id} id='tid' type='text' name='tid' 
                    onFocus={this.props.handleEdit}/> <br></br>
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='vnum'> Version #</label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus id='vnum' type='number' value= {taskers[index].version_num+1} min={taskers[index].version_num+1} name='vnum' 
                    onFocus={this.props.handleEdit}/><br></br>      
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='update'> Date of Update</label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus id='update' type='date' value={new Date().toISOString().substr(0,10)} name='update' 
                    onFocus={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                    <label className="col-md-2" id='tasker_name'> Tasker Name </label>{' '}
                    <input className="rux-input col-md-2 will-colors" autoFocus id='tasker_name' defaultValue={taskers[index].tasker_name} type='text' name='tasker_name' 
                    onBlur={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                      <label className="col-md-2"id='suspense'> Suspense Date</label>{' '}
                      <input className="rux-input col-md-2 will-colors" autoFocus defaultValue={taskers[index].suspense_date.substr(0,10)} id='suspense' type='date' name='suspense' 
                      onBlur={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">
                      <label className="col-md-2" id='priority'> Priority </label>{' '}
                      <select  className="rux-input col-md-2 will-colors" autoFocus id='priority' defaultValue={taskers[index].priority_lvl} name='priority' onBlur={this.props.handleEdit}>
                         <option>Low</option>
                         <option>Medium</option>
                         <option>High</option>
                      </select>
                      <br></br>
                  </div>

                  <div className="row pb-3">
                     <label className="col-md-2" id='workload'>Est. Workload </label>{' '}
                      <input className="rux-input col-md-2 will-colors" autoFocus min="1" id='workload' defaultValue={taskers[index].predicted_workload} type='number' name='workload'
                      onBlur={this.props.handleEdit}/><br></br>
                  </div>

                  <div className="row pb-3">  
                      <label className="col-md-2"  id='desc'> Description </label>{' '}
                      <textarea 
                        style={{borderRadius:'3px'}}
                        className="rux-form-field--large col-md-4 will-colors"
                        rows="10"
                        autoFocus 
                        defaultValue={taskers[index].desc_text}
                        type='text'
                        name='desc'
                        id="desc_text"
                        placeholder="Tasker Description"
                        onBlur={this.props.handleEdit} 
                    ></textarea>
                      <br></br>
                  </div>

                  <div className="row pb-3">  
                     <input  style={{float: 'left'}} className ="rux-button" type='submit' value="Submit"/>{' '}
                     <button  className ="rux-button" onClick={this.props.hide}>Cancel</button>
                  </div><br></br><br></br>

              </form> :''}
      </div>
    )
  }
}

export default EditTasker;
