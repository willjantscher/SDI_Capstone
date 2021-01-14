import React from "react";

class TaskerAttachmentInput extends React.Component {
  generateFileNames = () => {
    let selected_files_names = [];
    if(this.props.selected_files) {
      for(var i = 0; i < this.props.selected_files.length; i++) {
          selected_files_names.push(this.props.selected_files[i].name)
      }
    }
    return (
      selected_files_names.map((name) => {
        return(
          <div key={selected_files_names.indexOf(name)}>
              <div style={{textAlign: "center"}} >{name}</div>
          </div>
        )
      })
    );
  }

  render() {
    return(
    <form id="attachments_form"> 
      <label className="row mt-5" style={{marginBottom:"-40px"}}>Add Attachments: </label>
      <label className="row form-group files mt-5" htmlFor="file" id="fileInput">
        <input
          style={{height:"260px"}}
          type="file"
          id="file"
          onChange={this.props.onInputFileChange}
          className="form-control will-colors"
          multiple
        />
      </label>
      <div style={{marginTop:'-110px', position:"relative"}}>
          {this.generateFileNames()}
      </div>
    </form>
    );
  }
}


export default TaskerAttachmentInput;