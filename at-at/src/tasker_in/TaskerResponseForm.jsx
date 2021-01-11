import React from "react";

class TaskerResponseForm extends React.Component {
  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <textarea
          name="taskerResponseData"
          autoFocus={true}
          defaultValue={this.props.defaultValue}
        />
        <input type="submit" value="Submit" name="taskerResponseSubmitButton"/>
      </form>
    );
  }
}


export default TaskerResponseForm;