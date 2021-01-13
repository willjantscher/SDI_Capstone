import React from "react";

class TaskerResponseForm extends React.Component {
  render() {
    const {
      desc_text,
    } = this.props.tasker;
    
    const display = this.props.selected ? "table-row" : "none";
    const currentResponse = this.props.defaultValueResponse;

    return(
      <tr
        className="selected"
        style={{display: display}}
      >
        <td colSpan="7">
          <p className="row">{desc_text}</p>
          <form onSubmit={this.props.onSubmitResponse}>
            <label
              className="row"
              htmlFor="taskerResponseData"
            >
              Response:
            </label>
            <textarea
              className="row rux-form-field--large will-colors"
              id="taskerResponseData"
              name="taskerResponseData"
              cols={100}
              rows={10}
              autoFocus={true}
              defaultValue={currentResponse ? currentResponse : ""}
            />
            <input
              className="will-colors rux-button row"
              type="submit"
              value="Submit"
              name="taskerResponseSubmitButton"
            />
          </form>
        </td>
      </tr>
    );
  }
}


export default TaskerResponseForm;