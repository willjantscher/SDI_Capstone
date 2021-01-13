import React from "react";

class TaskerResponseForm extends React.Component {
  generateWorkloadOptions = () => {
    let workloadOptions = [];
    for(let i = 1; i < 25; i ++) {
        workloadOptions.push(
            <option id={i} key = {i} value={i}>{i}</option>
        )
    }
    return workloadOptions;
  }

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
          <p className="row mt-1">{desc_text}</p>
          <hr/>
          <form onSubmit={this.props.onSubmitResponse}>
            <label
              className="row mt-3"
              htmlFor="taskerResponseData"
            >
              Response:
            </label>
            <textarea
              className="row mt-1 rux-form-field--large will-colors"
              id="taskerResponseData"
              name="taskerResponseData"
              cols={100}
              rows={10}
              autoFocus={true}
              defaultValue={currentResponse ? currentResponse : ""}
            />
            <div className="row mt-2">
              <label
                className="mr-2 mt-1"
                htmlFor="taskerResponseWorkload"
              >
                Workload to define response:
              </label>
              <select
                className="rux-select col-md-1 will-colors"
                id="actual_workload"
                placeholder="hrs"
              >
                <optgroup label="Hours"></optgroup>
                {this.generateWorkloadOptions()}
              </select>
            </div>
            <input
              className="will-colors rux-button row mt-2"
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