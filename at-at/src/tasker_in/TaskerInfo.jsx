import React from "react";
import TaskerResponseForm from './TaskerResponseForm';
import TaskerAttachmentInput from './TaskerAttachmentInput';
import icon from '../icons/attachment_icon.png'

class TaskerInfo extends React.Component {
  getAttachmentNames = () => {
    return (
      <div className="col-md-4">
        {this.props.attachments.map(attachment => {
          return(
            <p key={attachment.id} className="">
              <img src={icon} alt="listItemIcon" height="20" width="20"/>
              <a href={`${this.props.apiUrl}/download/${attachment.id}`}>
                {attachment.originalname}
              </a>
              
            </p>
          );
        })}
      </div>
    );
  }

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
        <td colSpan="7" className="">
          <div className="row">
            <div className="col-md-8">
              <label
                className="row"
                htmlFor="taskerDetails"
              >
                Details:
              </label>
              <p
                className="row mt-2"
                id="taskerDetails"
                style={{width: "100%", wordBreak: "break-word", whiteSpace: "normal"}}
              >
                {desc_text}
              </p>
            </div>
            {this.getAttachmentNames()}
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-8">
              <TaskerResponseForm
                onSubmitResponse={this.props.onSubmitResponse}
                defaultValueResponse={this.props.defaultValueResponse}
              />
            </div>
            <div className="col-md-4">
              <TaskerAttachmentInput
                onInputFileChange={this.props.onInputFileChange}
                selected_files={this.props.selected_files}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}


export default TaskerInfo;