import React from "react";

class TaskerResponseForm extends React.Component {
  render() {
    return(
      <form className="container-fluid" onSubmit={this.props.onSubmit}>
        <label
          className="row mx-0"
          for="taskerResponseData"
        >
          Response:
        </label>
        <textarea
          className="row mx-0"
          id="taskerResponseData"
          name="taskerResponseData"
          cols={100}
          rows={10}
          autoFocus={true}
          defaultValue={this.props.defaultValue}
        />
        <input
          className="row mx-0"
          type="submit"
          value="Submit"
          name="taskerResponseSubmitButton"
        />
      </form>
    );
  }
}


export default TaskerResponseForm;