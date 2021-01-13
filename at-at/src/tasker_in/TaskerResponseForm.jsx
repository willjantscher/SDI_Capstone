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
    const currentResponse = this.props.defaultValueResponse;

    return(
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
            Workload:
          </label>
          <select
            className="rux-select will-colors"
            id="taskerResponseWorkload"
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
    );
  }
}


export default TaskerResponseForm;