import React from "react";
import TaskerResponseForm from './TaskerResponseForm';

class TaskerInfo extends React.Component {
  render() {
    const {
      desc_text,
    } = this.props.tasker;
    
    const display = this.props.selected ? "table-row" : "none";

    return(
      <tr
        className="selected"
        style={{display: display}}
      >
        <td colSpan="8">
          <label
            className="row mt-1"
            htmlFor="taskerDetails"
          >
            Details:
          </label>
          <p className="row mt-2" id="taskerDetails">{desc_text}</p>
          <hr/>
          <TaskerResponseForm
            onSubmitResponse={this.props.onSubmitResponse}
            defaultValueResponse={this.props.defaultValueResponse}
          />
        </td>
      </tr>
    );
  }
}


export default TaskerInfo;