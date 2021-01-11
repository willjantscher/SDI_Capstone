import React from "react";

class TaskerResponseForm extends React.Component {
  render() {
    return(
      <form className="container-fluid" onSubmit={this.props.onSubmit}>
        <div className="row">
          <textarea
            className="mx-3"
            name="taskerResponseData"
            autoFocus={true}
            defaultValue={this.props.defaultValue}
          />
        </div>
        <div className="row">
          <input
            className="mx-3"
            type="submit"
            value="Submit"
            name="taskerResponseSubmitButton"
          />
        </div>
      </form>
    );
  }
}


export default TaskerResponseForm;