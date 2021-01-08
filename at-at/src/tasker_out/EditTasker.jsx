import React from "react";

class EditTasker extends React.Component {
  
  render() {
    return(
      <div>
      <button type="submit" onClick={this.props.editTasker}>Click Me</button>
      
      </div>
    );
  }
}

export default EditTasker;