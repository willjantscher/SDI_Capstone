import React, { useState, Fragment } from "react";

// create a variable that holds the whole form
// buttons will update that variable
// return is that


const TaskerForm = (props) => {
    let i = 0;
    let unitNames = props.units.map((unit) => {
        i += 1;
        return(
            <option
                value={unit}
                key={i}
            >
                {unit}
            </option>
        )
    })

    const [inputFields, setInputFields] = useState([
        { unit : '' }
    ]);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ unit: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
            values[index].unit = event.target.value;
            //create a handler for this that sets the values when called from in here
        setInputFields(values);
        props.onUnitChange(values);
    };

    const buttonHandler = (index) => {
        if(inputFields.length<2) {
            return(
                <button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddFields()}
                >
                +
                </button>
            )
        } else return(
            <div>
                <button
                className="btn btn-link"
                type="button"
                onClick={() => handleRemoveFields(index)}
                >
                -
                </button>

                <button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddFields()}
                >
                +
                </button>
            </div>
        )
    }

    return(
        <>
            <div>Select Units to send this Tasker to</div>
            <form onSubmit={props.onSubmitTasker}>
                <div className="form-row">
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                        <div className="form-group col-sm-6">
                            <label htmlFor="unit">Unit: </label>
                            <select
                                className="form-control"
                                id="unit"
                                name="unit"
                                value={inputField.unit}
                                onChange={event => { handleInputChange(index, event)}}
                                ><option key="empty" value=""></option>
                                {unitNames}
                            </select>
                        </div>

                        <div className="form-group col-sm-2">
                            {buttonHandler(index)}
                        </div>

                        </Fragment>
                    ))}
                </div>

                <div>
                    <span>Tasker Name:</span>
                    <input 
                        id="tasker_name"
                        name="Tasker Name"
                        placeholder="Tasker Name"
                        onChange={props.onInputChange} 
                    ></input>
                </div>

                <div>
                    <span>Suspense Date</span>
                    <input
                        id="suspense_date"
                        type="date"
                        onChange={props.onInputChange}
                    ></input>
                </div>

                <div>
                    <span>Priority</span>
                    <select id="priority_lvl" defaultValue = "Low" onChange={props.onInputChange}>
                        <option key="Low" value="Low">Low</option>
                        <option key="Medium" value="Medium">Medium</option>
                        <option key="High" value="High">High</option>
                    </select>
                </div>

                <div>
                    <span>Predicted Workload (hours)</span>
                    <input
                        id="predicted_workload"
                        type="number"
                        min="1"
                        max="24"
                        placeholder="hrs"
                        onChange={props.onInputChange} 
                    ></input>
                </div>

                <div>
                    <textarea 
                        id="desc_text"
                        placeholder="Tasker Description"
                        onChange={props.onInputChange} 
                    ></textarea>
                </div>

                <input type="submit" value="Send Tasker with Extreme Prejudice"/>
            </form>
            <span> ------------------------------------------------------------------------ </span>
        </>
    )
}

export default TaskerForm;